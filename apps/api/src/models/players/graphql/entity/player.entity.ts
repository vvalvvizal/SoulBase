import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Player as PlayerType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Player implements RestrictProperties<Player, PlayerType> {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String) //Date를 String으로 처리
  createdAt: Date;

  @Field(() => Int)
  userId: number;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
