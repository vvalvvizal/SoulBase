import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class PlayerWhereUniqueInput {
  id: number
}

@InputType()
export class PlayerWhereInputStrict implements RestrictProperties<PlayerWhereInputStrict, Prisma.PlayerWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: PlayerWhereInput[]
  OR: PlayerWhereInput[]
  NOT: PlayerWhereInput[]
}

@InputType()
export class PlayerWhereInput extends PartialType(
  PlayerWhereInputStrict,
) {}

@InputType()
export class PlayerListRelationFilter {
  every?: PlayerWhereInput
  some?: PlayerWhereInput
  none?: PlayerWhereInput
}

@InputType()
export class PlayerRelationFilter {
  is?: PlayerWhereInput
  isNot?: PlayerWhereInput
}
