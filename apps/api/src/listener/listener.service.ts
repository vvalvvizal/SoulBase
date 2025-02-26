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
        async (to, tokenId, metadataJSON_url) => {
          const url = String(metadataJSON_url);
          //세부 정보 JSON 가져오기
          const metadata = await fetch(url).then((res) => res.json());

          const player = await this.prisma.player.findFirst({
            where: { user: { address: to } },
          });

          if (!player) {
            console.log(`Event: Player not found for address: ${to}`);
            return;
          }

          //Prisma DB에 저장
          await this.prisma.sBT.create({
            data: {
              tokenId: BigInt(tokenId),
              name: metadata.name,
              description: metadata.description,
              image_url: metadata.image,
              metadataJSON_url: url,
              playerId: player.id,
            },
          });
          console.log(`Event: SBT ${tokenId} saved for player ${player.id}`);
        },
      );
      console.log(`Event: SBTMinted Listening...`);
    } catch (error) {
      console.error(`Event: SBTCreated: Listener setup failed`, error);
    }
  }

  cleanup() {
    this.provider.removeAllListeners();
  }
  async getBlockTimeStamp(blockNumber: number) {
    const block = await this.provider.getBlock(blockNumber);
    return new Date(block.timestamp);
  }
}
