import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SBT as SBTtype } from '@prisma/client';
import { GraphQLBigInt } from 'graphql-scalars';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class SBT implements RestrictProperties<SBT, SBTtype> {
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLBigInt)
  tokenId: bigint;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  image_url: string;

  @Field(() => String)
  metadataJSON_url: string;

  @Field(() => String) //Date를 String으로 처리
  createdAt: Date;

  @Field(() => String) //Date를 String으로 처리
  updatedAt: Date;

  @Field(() => String) //Date를 String으로 처리
  blockTimestamp: Date;

  @Field(() => Int)
  playerId: number;
}
