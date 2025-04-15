import { Controller, Get, Param, Query } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';
import { UserQueryDto } from './dtos/query.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOkResponse({ type: [UserEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: UserQueryDto) {
    return this.prisma.user.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
