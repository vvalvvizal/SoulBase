import { Module } from '@nestjs/common'
import { PlayersService } from './graphql/players.service'
import { PlayersResolver } from './graphql/players.resolver'
import { PlayersController } from './rest/players.controller'

@Module({
  providers: [PlayersResolver, PlayersService],
  exports: [PlayersService],
  controllers: [PlayersController],
})
export class PlayersModule {}
