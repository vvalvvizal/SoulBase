import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PlayersService } from './players.service'
import { Player } from './entity/player.entity'
import { FindManyPlayerArgs, FindUniquePlayerArgs } from './dtos/find.args'
import { CreatePlayerInput } from './dtos/create-player.input'
import { UpdatePlayerInput } from './dtos/update-player.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => Player)
export class PlayersResolver {
  constructor(private readonly playersService: PlayersService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => Player)
  createPlayer(@Args('createPlayerInput') args: CreatePlayerInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.playersService.create(args)
  }

  @Query(() => [Player], { name: 'players' })
  findAll(@Args() args: FindManyPlayerArgs) {
    return this.playersService.findAll(args)
  }

  @Query(() => Player, { name: 'player' })
  findOne(@Args() args: FindUniquePlayerArgs) {
    return this.playersService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Player)
  async updatePlayer(@Args('updatePlayerInput') args: UpdatePlayerInput, @GetUser() user: GetUserType) {
    const player = await this.prisma.player.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, player.uid)
    return this.playersService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Player)
  async removePlayer(@Args() args: FindUniquePlayerArgs, @GetUser() user: GetUserType) {
    const player = await this.prisma.player.findUnique(args)
    checkRowLevelPermission(user, player.uid)
    return this.playersService.remove(args)
  }
}
