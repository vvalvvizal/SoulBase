import { Resolver, Query, Args } from '@nestjs/graphql';
import { SBTsService } from './sbts.service';
import { SBT } from './entity/sbt.entity';
import { FindManySBTArgs, FindUniqueSBTArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Resolver(() => SBT)
export class SBTsResolver {
  constructor(
    private readonly sbtsService: SBTsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [SBT], { name: 'SBTs' })
  findAll(@Args() args: FindManySBTArgs) {
    return this.sbtsService.findAll(args);
  }

  @Query(() => SBT, { name: 'SBT' })
  findOne(@Args() args: FindUniqueSBTArgs) {
    return this.sbtsService.findOne(args);
  }
}
