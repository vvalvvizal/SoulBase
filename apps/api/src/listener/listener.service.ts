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
    this.initializeWebSocketProvider();
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
      // //contract 함수 사용
      // this.contract.on(
      //   this.contract.filters[''],
      //   (account, amount, event) => {
      //      const blockNumber =  event.log.blockNumber
      //      const timestamp = this.getBlockTimeStamp(blockNumber);
      //      await this.prisma.user.
      //   }
      // );
      // console.log('Event: BaseballTokenMinted Listening...')
    } catch (error) {
      console.log(error);
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
