import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreatePlayer } from './dtos/create.dto'
import { PlayerQueryDto } from './dtos/query.dto'
import { UpdatePlayer } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { PlayerEntity } from './entity/player.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'


@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PlayerEntity })
  @Post()
  create(@Body() createPlayerDto: CreatePlayer, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createPlayerDto.uid)
    return this.prisma.player.create({ data: createPlayerDto })
  }

  @ApiOkResponse({ type: [PlayerEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: PlayerQueryDto) {
    return this.prisma.player.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: PlayerEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.player.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: PlayerEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePlayerDto: UpdatePlayer,
    @GetUser() user: GetUserType,
  ) {
    const player = await this.prisma.player.findUnique({ where: { id } })
    checkRowLevelPermission(user, player.uid)
    return this.prisma.player.update({
      where: { id },
      data: updatePlayerDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const player = await this.prisma.player.findUnique({ where: { id } })
    checkRowLevelPermission(user, player.uid)
    return this.prisma.player.delete({ where: { id } })
  }
}
