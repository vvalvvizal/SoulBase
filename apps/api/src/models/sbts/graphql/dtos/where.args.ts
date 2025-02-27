import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  RestrictProperties,
  StringFilter,
  DateTimeFilter,
  IntFilter,
} from 'src/common/dtos/common.input';

@InputType()
export class SBTWhereUniqueInput {
  id: number;
}

@InputType()
export class SBTWhereInputStrict
  implements RestrictProperties<SBTWhereInputStrict, Prisma.SBTWhereInput>
{
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)
  id: IntFilter;
  tokenId: IntFilter;
  name: StringFilter;
  description: StringFilter;
  image_url: StringFilter;
  metadataJSON_url: StringFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  blockTimestamp: DateTimeFilter;
  playerId: IntFilter;

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
