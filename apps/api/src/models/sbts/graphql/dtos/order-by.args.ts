import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class SbtOrderByWithRelationInputStrict
  implements RestrictProperties<SbtOrderByWithRelationInputStrict, Prisma.SbtOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class SbtOrderByWithRelationInput extends PartialType(
  SbtOrderByWithRelationInputStrict,
) {}

@InputType()
export class SbtOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
