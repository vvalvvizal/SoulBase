import { Module } from '@nestjs/common';
import { SbtsService } from './graphql/sbts.service';
import { SbtsResolver } from './graphql/sbts.resolver';
import { SbtsController } from './rest/sbts.controller';

@Module({
  providers: [SbtsResolver, SbtsService],
  exports: [SbtsService],
  controllers: [SbtsController],
})
export class SbtsModule {}
