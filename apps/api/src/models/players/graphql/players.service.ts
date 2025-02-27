import { Injectable } from '@nestjs/common'
import { FindManyPlayerArgs, FindUniquePlayerArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreatePlayerInput } from './dtos/create-player.input'
import { UpdatePlayerInput } from './dtos/update-player.input'

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPlayerInput: CreatePlayerInput) {
    return this.prisma.player.create({
      data: createPlayerInput,
    })
  }

  findAll(args: FindManyPlayerArgs) {
    return this.prisma.player.findMany(args)
  }

  findOne(args: FindUniquePlayerArgs) {
    return this.prisma.player.findUnique(args)
  }

  update(updatePlayerInput: UpdatePlayerInput) {
    const { id, ...data } = updatePlayerInput
    return this.prisma.player.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniquePlayerArgs) {
    return this.prisma.player.delete(args)
  }
}
