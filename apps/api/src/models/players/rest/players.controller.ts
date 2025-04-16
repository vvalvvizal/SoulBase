import { Controller, Get, Param, Query } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';
import { PlayerQueryDto } from './dtos/query.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { PlayerEntity } from './entity/player.entity';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOkResponse({ type: [PlayerEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: PlayerQueryDto) {
    return this.prisma.player.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: PlayerEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.player.findUnique({ where: { id } });
  }
}
