import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  AchievementSBT,
  AchievementSBT__factory,
} from '../../../../standalone/soulBase-contract/typechain-types';
import { SBTcontractAddress } from 'src/common/utils';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ListenerService implements OnModuleInit, OnModuleDestroy {
  private provider: ethers.WebSocketProvider;
  private contract: AchievementSBT;

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    //  Initialie web socekt provider
    this.initializeWebSocketProvider();

    //  Setup the event subscriber
    this.subscribeToEvents();
  }

  onModuleDestroy() {
    this.cleanup();
  }

  initializeWebSocketProvider() {
    //  Initialize web socket provider
    const infuraWssUrl = `wss://polygon-amoy.infura.io/ws/v3/${process.env.INFURA_KEY}`;
    this.provider = new ethers.WebSocketProvider(infuraWssUrl);

    this.contract = AchievementSBT__factory.connect(
      SBTcontractAddress,
      this.provider,
    );
  }

  subscribeToEvents() {
    try {
      //contract 함수 사용
      this.contract.on(
        this.contract.filters['SBTMinted'], //SBT 발생되었을 때 발생하는 이벤트
        async (to, tokenId, metadataJSON_url, event) => {
          const blockNumber = event.blockNumber;
          const timestamp = await this.getBlockTimeStamp(blockNumber);
          const url = String(metadataJSON_url);

          //세부 정보 JSON 가져오기
          let metadata;
          try {
            metadata = await fetch(url).then((res) => res.json());
          } catch (err) {
            console.error(
              `Event: Error fetching metadata from URL: ${url}`,
              err,
            );
            return;
          }

          const player = await this.prisma.player.findFirst({
            where: { user: { address: to } },
          });

          if (!player) {
            console.log(`Event: Player not found for address: ${to}`);
            return;
          }

          await this.createSBT({
            tokenId: BigInt(tokenId),
            name: metadata.name,
            description: metadata.description,
            image_url: metadata.image,
            metadataJSON_url: url,
            blockTimestamp: timestamp,
            playerId: player.id,
          });

          console.log(`Event: SBT ${tokenId} saved for player ${player.id}`);
        },
      );
      console.log(`Event: SBTMinted Listening...📡`);
    } catch (error) {
      console.error(`Event: SBTCreated: Listener setup failed`, error);
    }

    try {
      this.contract.on(
        this.contract.filters['SBTUpdated'],
        async (tokenId, oldTokenURI, newTokenURI) => {
          await this.updateSBT({
            tokenId: BigInt(tokenId),
            metadataJSON_url: newTokenURI,
          });

          console.log(
            `Event: SBT ${tokenId} updated ${oldTokenURI} -> ${newTokenURI}`,
          );
        },
      );

      console.log(`Event: SBTUpdated Listening...📡`);
    } catch (error) {
      console.error(`Event: SBTUpdated: Listener setup failed`, error);
    }
  }
  async resyncBlockchainData() {
    if (!this.contract) {
      throw new Error('Contract is not intialized');
    }
    const fromBlock = 0;
    const toBlock = 'latest';

    //Query and handle SBTMinted events
    const SBTMintedEvents = await this.contract.queryFilter(
      this.contract.filters['SBTMinted'],
      fromBlock,
      toBlock,
    );

    for (const event of SBTMintedEvents) {
      const [to, tokenId, metadataJSON_url] = event.args;
      const timestamp = await this.getBlockTimeStamp(event.blockNumber);

      const url = String(metadataJSON_url);

      let metadata;
      try {
        metadata = await fetch(url).then((res) => res.json());
      } catch (err) {
        console.error(`Event: Error fetching metadata from URL: ${url}`, err);
        return;
      }

      const player = await this.prisma.player.findFirst({
        where: { user: { address: to } },
      });

      if (!player) {
        console.log(`Event: Player not found for address: ${to}`);
        return;
      }

      await this.createSBT({
        tokenId: BigInt(tokenId),
        name: metadata.name,
        description: metadata.description,
        image_url: metadata.image,
        metadataJSON_url: url,
        blockTimestamp: timestamp,
        playerId: player.id,
      });
    }
  }
  cleanup() {
    this.provider.removeAllListeners();
  }

  //utils
  async getBlockTimeStamp(blockNumber: number) {
    const block = await this.provider.getBlock(blockNumber);
    return new Date(block.timestamp * 1000); //Unix 타임스탬프 -> 밀리초 변환
  }

  //DB Writes

  private async createSBT({
    tokenId,
    name,
    description,
    image_url,
    metadataJSON_url,
    blockTimestamp,
    playerId,
  }: {
    tokenId: bigint;
    name: string;
    description: string;
    image_url: string;
    metadataJSON_url: string;
    blockTimestamp: Date;
    playerId: number;
  }) {
    const sbt = await this.prisma.sBT.create({
      data: {
        tokenId,
        name,
        description,
        image_url,
        metadataJSON_url,
        blockTimestamp,
        playerId,
      },
    });
    console.log('✅ SBT Minted:', sbt);
  }

  private async updateSBT({
    tokenId,
    metadataJSON_url,
  }: {
    tokenId: bigint;
    metadataJSON_url: string;
  }) {
    const updatedsbt = await this.prisma.sBT.update({
      where: {
        tokenId,
      },
      data: {
        metadataJSON_url,
      },
    });
    console.log('✅ SBT Updated:', updatedsbt);
  }
}
