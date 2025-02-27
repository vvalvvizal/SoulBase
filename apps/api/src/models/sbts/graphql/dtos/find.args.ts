import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { SbtOrderByWithRelationInput } from './order-by.args'
import { SbtWhereInput, SbtWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.SbtScalarFieldEnum, {
  name: 'SbtScalarFieldEnum',
})

@ArgsType()
class FindManySbtArgsStrict
  implements RestrictProperties<FindManySbtArgsStrict, Omit<Prisma.SbtFindManyArgs, 'include' | 'select'>>
{
  where: SbtWhereInput
  orderBy: SbtOrderByWithRelationInput[]
  cursor: SbtWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.SbtScalarFieldEnum])
  distinct: Prisma.SbtScalarFieldEnum[]
}

@ArgsType()
export class FindManySbtArgs extends PartialType(
  FindManySbtArgsStrict,
) {}

@ArgsType()
export class FindUniqueSbtArgs {
  where: SbtWhereUniqueInput
}