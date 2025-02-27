import { Injectable } from '@nestjs/common';
import { FindManySbtArgs, FindUniqueSbtArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SbtsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManySbtArgs) {
    return this.prisma.sbt.findMany(args);
  }

  findOne(args: FindUniqueSbtArgs) {
    return this.prisma.sbt.findUnique(args);
  }
}
