import { Injectable } from '@nestjs/common';
import { FindManySBTArgs, FindUniqueSBTArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SBTsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManySBTArgs) {
    return this.prisma.sBT.findMany(args);
  }

  findOne(args: FindUniqueSBTArgs) {
    return this.prisma.sBT.findUnique(args);
  }
}
