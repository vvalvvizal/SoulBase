import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class PlayerOrderByWithRelationInputStrict
  implements RestrictProperties<PlayerOrderByWithRelationInputStrict, Prisma.PlayerOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class PlayerOrderByWithRelationInput extends PartialType(
  PlayerOrderByWithRelationInputStrict,
) {}

@InputType()
export class PlayerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
