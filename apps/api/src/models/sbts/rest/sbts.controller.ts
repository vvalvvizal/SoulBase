import { Controller, Get, Param, Query } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';
import { SBTQueryDto } from './dtos/query.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { SBTEntity } from './entity/sBT.entity';

@ApiTags('sBTs')
@Controller('sBTs')
export class SBTsController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOkResponse({ type: [SBTEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: SBTQueryDto) {
    return this.prisma.sBT.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: SBTEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.sBT.findUnique({ where: { id } });
  }
}
