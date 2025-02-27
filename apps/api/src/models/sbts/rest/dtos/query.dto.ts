import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class SbtQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.SbtScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.SbtScalarFieldEnum))
  searchBy?: string
}

