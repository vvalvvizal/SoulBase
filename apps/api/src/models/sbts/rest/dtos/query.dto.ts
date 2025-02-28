import { IsIn, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';
import { BaseQueryDto } from 'src/common/dtos/common.dto';

export class SBTQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.SBTScalarFieldEnum))
  sortBy?: string;

  @IsOptional()
  @IsIn(Object.values(Prisma.SBTScalarFieldEnum))
  searchBy?: string;
}
