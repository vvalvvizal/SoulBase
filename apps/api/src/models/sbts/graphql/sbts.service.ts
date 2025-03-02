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
    if (!args.where) {
      //id가 요청에 포함되지 않은 경우
      throw new Error("'id' is required");
    }

    return this.prisma.sBT.findUnique({
      where: args.where,
    });
  }
}
