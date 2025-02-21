import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { ListenerService } from './listener/listener.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService, ListenerService],
})
export class AppModule {}
