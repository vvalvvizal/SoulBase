import {
  ArgsType,
  Field,
  registerEnumType,
  PartialType,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { SBTOrderByWithRelationInput } from './order-by.args';
import { SBTWhereInput, SBTWhereUniqueInput } from './where.args';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType(Prisma.SBTScalarFieldEnum, {
  name: 'SBTScalarFieldEnum',
});

@ArgsType()
class FindManySBTArgsStrict
  implements
    RestrictProperties<
      FindManySBTArgsStrict,
      Omit<Prisma.SBTFindManyArgs, 'include' | 'select' | 'omit'>
    >
{
  where: SBTWhereInput;
  orderBy: SBTOrderByWithRelationInput[];
  cursor: SBTWhereUniqueInput;
  take: number;
  skip: number;

  @Field(() => [Prisma.SBTScalarFieldEnum])
  distinct: Prisma.SBTScalarFieldEnum[];
}

@ArgsType()
export class FindManySBTArgs extends PartialType(FindManySBTArgsStrict) {}

@ArgsType()
export class FindUniqueSBTArgs {
  where: SBTWhereUniqueInput;
}
