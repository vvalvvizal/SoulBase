import { Resolver, Query, Args } from '@nestjs/graphql';
import { SbtsService } from './sbts.service';
import { SBT } from './entity/sbt.entity';
import { FindManySbtArgs, FindUniqueSbtArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Resolver(() => SBT)
export class SbtsResolver {
  constructor(
    private readonly sbtsService: SbtsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [SBT], { name: 'sbts' })
  findAll(@Args() args: FindManySbtArgs) {
    return this.sbtsService.findAll(args);
  }

  @Query(() => SBT, { name: 'sbt' })
  findOne(@Args() args: FindUniqueSbtArgs) {
    return this.sbtsService.findOne(args);
  }
}
