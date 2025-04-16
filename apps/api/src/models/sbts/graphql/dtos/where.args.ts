import { InputType, PartialType, Int, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  RestrictProperties,
  StringFilter,
  DateTimeFilter,
  IntFilter,
} from 'src/common/dtos/common.input';
import {
  PlayerRelationFilter,
  PlayerWhereInput,
} from 'src/models/players/graphql/dtos/where.args';

@InputType()
export class SBTWhereUniqueInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class SBTWhereInputStrict
  implements RestrictProperties<SBTWhereInputStrict, Prisma.SBTWhereInput>
{
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)
  @Field(() => Int)
  id: IntFilter;

  @Field(() => Int)
  tokenId: IntFilter;

  @Field(() => String)
  name: StringFilter;

  @Field(() => String)
  description: StringFilter;

  @Field(() => String)
  image_url: StringFilter;

  @Field(() => String)
  metadataJSON_url: StringFilter;

  @Field(() => String) //Date를 String으로 처리
  createdAt: DateTimeFilter;

  @Field(() => String) //Date를 String으로 처리
  updatedAt: DateTimeFilter;

  @Field(() => String) //Date를 String으로 처리
  blockTimestamp: DateTimeFilter;

  @Field(() => Int)
  playerId: IntFilter;

  @Field(() => PlayerWhereInput)
  player: PlayerRelationFilter;

  AND: SBTWhereInput[];
  OR: SBTWhereInput[];
  NOT: SBTWhereInput[];
}

@InputType()
export class SBTWhereInput extends PartialType(SBTWhereInputStrict) {}

@InputType()
export class SBTListRelationFilter {
  every?: SBTWhereInput;
  some?: SBTWhereInput;
  none?: SBTWhereInput;
}

@InputType()
export class SBTRelationFilter {
  is?: SBTWhereInput;
  isNot?: SBTWhereInput;
}
