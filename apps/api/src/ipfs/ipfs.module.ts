import { Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { IpfsController } from './ipfs.controller';

@Module({
  exports: [IpfsService],
  controllers: [IpfsController],
  providers: [IpfsService],
})
export class IpfsModule {}
