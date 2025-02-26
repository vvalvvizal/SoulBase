import { Module } from '@nestjs/common';
import { ListenerService } from './listener.service';
@Module({
  exports: [ListenerService],
})
export class ListenerModule {}
