import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { PlayerOrderByWithRelationInput } from 'src/models/players/graphql/dtos/order-by.args';

@InputType()
export class SBTOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      SBTOrderByWithRelationInputStrict,
      Prisma.SBTOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  tokenId: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  name: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  description: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  image_url: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  metadataJSON_url: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  blockTimestamp: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  playerId: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  player: PlayerOrderByWithRelationInput;

  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class SBTOrderByWithRelationInput extends PartialType(
  SBTOrderByWithRelationInputStrict,
) {}

@InputType() //집계연산
export class SBTOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
