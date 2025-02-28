import { InputType, PartialType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { SBTWhereInput } from 'src/models/sbts/graphql/dtos/where.args';
import { UserWhereInput } from 'src/models/users/graphql/dtos/where.args';

@InputType()
export class PlayerWhereUniqueInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class PlayerWhereInputStrict
  implements RestrictProperties<PlayerWhereInputStrict, Prisma.PlayerWhereInput>
{
  @Field(() => Int)
  id: number | Prisma.IntFilter<'Player'>;

  @Field(() => String)
  name: string | Prisma.StringFilter<'Player'>;

  @Field(() => String) //Date를 String으로 처리
  createdAt: string | Date | Prisma.DateTimeFilter<'Player'>;

  @Field(() => Int)
  userId: number | Prisma.IntFilter<'Player'>;

  @Field(() => UserWhereInput)
  user:
    | (Prisma.Without<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput> &
        Prisma.UserWhereInput)
    | (Prisma.Without<Prisma.UserWhereInput, Prisma.UserScalarRelationFilter> &
        Prisma.UserScalarRelationFilter);

  @Field(() => SBTWhereInput)
  sbts: Prisma.SBTListRelationFilter;
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: PlayerWhereInput[];
  OR: PlayerWhereInput[];
  NOT: PlayerWhereInput[];
}

@InputType()
export class PlayerWhereInput extends PartialType(PlayerWhereInputStrict) {}

@InputType()
export class PlayerListRelationFilter {
  every?: PlayerWhereInput;
  some?: PlayerWhereInput;
  none?: PlayerWhereInput;
}

@InputType()
export class PlayerRelationFilter {
  is?: PlayerWhereInput;
  isNot?: PlayerWhereInput;
}
