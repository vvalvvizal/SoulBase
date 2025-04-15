import { Resolver, Query, Args } from '@nestjs/graphql';
import { PlayersService } from './players.service';
import { Player } from './entity/player.entity';
import { FindManyPlayerArgs, FindUniquePlayerArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Resolver(() => Player)
export class PlayersResolver {
  constructor(
    private readonly playersService: PlayersService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Player], { name: 'players' })
  findAll(@Args() args: FindManyPlayerArgs) {
    return this.playersService.findAll(args);
  }

  @Query(() => Player, { name: 'player' })
  findOne(@Args() args: FindUniquePlayerArgs) {
    return this.playersService.findOne(args);
  }
}
