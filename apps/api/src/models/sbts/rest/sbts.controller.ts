import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateSbt } from './dtos/create.dto'
import { SbtQueryDto } from './dtos/query.dto'
import { UpdateSbt } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { SbtEntity } from './entity/sbt.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'


@ApiTags('sbts')
@Controller('sbts')
export class SbtsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SbtEntity })
  @Post()
  create(@Body() createSbtDto: CreateSbt, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createSbtDto.uid)
    return this.prisma.sbt.create({ data: createSbtDto })
  }

  @ApiOkResponse({ type: [SbtEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: SbtQueryDto) {
    return this.prisma.sbt.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: SbtEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.sbt.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: SbtEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSbtDto: UpdateSbt,
    @GetUser() user: GetUserType,
  ) {
    const sbt = await this.prisma.sbt.findUnique({ where: { id } })
    checkRowLevelPermission(user, sbt.uid)
    return this.prisma.sbt.update({
      where: { id },
      data: updateSbtDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const sbt = await this.prisma.sbt.findUnique({ where: { id } })
    checkRowLevelPermission(user, sbt.uid)
    return this.prisma.sbt.delete({ where: { id } })
  }
}
