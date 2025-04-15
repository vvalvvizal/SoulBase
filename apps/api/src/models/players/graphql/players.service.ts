import { Injectable } from '@nestjs/common';
import { FindManyPlayerArgs, FindUniquePlayerArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyPlayerArgs) {
    return this.prisma.player.findMany(args);
  }

  findOne(args: FindUniquePlayerArgs) {
    return this.prisma.player.findUnique(args);
  }

  remove(args: FindUniquePlayerArgs) {
    return this.prisma.player.delete(args);
  }
}
