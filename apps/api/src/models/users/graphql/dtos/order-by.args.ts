import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { PlayerOrderByWithRelationInput } from 'src/models/players/graphql/dtos/order-by.args';

@InputType()
export class UserOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      UserOrderByWithRelationInputStrict,
      Prisma.UserOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  isAdmin: Prisma.SortOrder;

  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder;

  @Field(() => Prisma.SortOrder)
  name: Prisma.SortOrder;

  @Field(() => Prisma.SortOrder)
  address: Prisma.SortOrder;

  @Field(() => Prisma.SortOrder)
  isPlayer: Prisma.SortOrder;

  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;

  @Field(() => Prisma.SortOrder)
  Player: PlayerOrderByWithRelationInput;
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class UserOrderByWithRelationInput extends PartialType(
  UserOrderByWithRelationInputStrict,
) {}

@InputType()
export class UserOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
