import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { PlayerOrderByWithRelationInput } from './order-by.args'
import { PlayerWhereInput, PlayerWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.PlayerScalarFieldEnum, {
  name: 'PlayerScalarFieldEnum',
})

@ArgsType()
class FindManyPlayerArgsStrict
  implements RestrictProperties<FindManyPlayerArgsStrict, Omit<Prisma.PlayerFindManyArgs, 'include' | 'select'>>
{
  where: PlayerWhereInput
  orderBy: PlayerOrderByWithRelationInput[]
  cursor: PlayerWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.PlayerScalarFieldEnum])
  distinct: Prisma.PlayerScalarFieldEnum[]
}

@ArgsType()
export class FindManyPlayerArgs extends PartialType(
  FindManyPlayerArgsStrict,
) {}

@ArgsType()
export class FindUniquePlayerArgs {
  where: PlayerWhereUniqueInput
}