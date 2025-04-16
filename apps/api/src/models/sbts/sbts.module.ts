import { Module } from '@nestjs/common';
import { SBTsService } from './graphql/sbts.service';
import { SBTsResolver } from './graphql/sbts.resolver';
import { SBTsController } from './rest/sbts.controller';

@Module({
  providers: [SBTsResolver, SBTsService],
  exports: [SBTsService],
  controllers: [SBTsController],
})
export class SbtsModule {}
