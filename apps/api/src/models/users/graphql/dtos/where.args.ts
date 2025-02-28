import { InputType, PartialType, Int, Field } from '@nestjs/graphql';
import { $Enums, Prisma } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { PlayerWhereInput } from 'src/models/players/graphql/dtos/where.args';

@InputType()
export class UserWhereUniqueInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class UserWhereInputStrict
  implements RestrictProperties<UserWhereInputStrict, Prisma.UserWhereInput>
{
  @Field(() => Boolean)
  isAdmin: boolean | Prisma.BoolFilter<'User'>;
  @Field(() => Int)
  id: number | Prisma.IntFilter<'User'>;

  @Field(() => String)
  name: string | Prisma.StringFilter<'User'>;

  @Field(() => String)
  address: string | Prisma.StringFilter<'User'>;

  @Field(() => $Enums.User_Type)
  isPlayer: Prisma.EnumUser_TypeFilter<'User'> | $Enums.User_Type;

  @Field(() => String) //Date를 String으로 처리
  createdAt: string | Date | Prisma.DateTimeFilter<'User'>;

  @Field(() => PlayerWhereInput)
  Player:
    | (Prisma.Without<
        Prisma.PlayerNullableScalarRelationFilter,
        Prisma.PlayerWhereInput
      > &
        Prisma.PlayerWhereInput)
    | (Prisma.Without<
        Prisma.PlayerWhereInput,
        Prisma.PlayerNullableScalarRelationFilter
      > &
        Prisma.PlayerNullableScalarRelationFilter);
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: UserWhereInput[];
  OR: UserWhereInput[];
  NOT: UserWhereInput[];
}

@InputType()
export class UserWhereInput extends PartialType(UserWhereInputStrict) {}

@InputType()
export class UserListRelationFilter {
  every?: UserWhereInput;
  some?: UserWhereInput;
  none?: UserWhereInput;
}

@InputType()
export class UserRelationFilter {
  is?: UserWhereInput;
  isNot?: UserWhereInput;
}
