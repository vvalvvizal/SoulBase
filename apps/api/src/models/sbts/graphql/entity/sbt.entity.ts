import { ObjectType } from '@nestjs/graphql';
import { SBT as SbtType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class SBT implements RestrictProperties<SBT, SbtType> {
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
  id: number;
  tokenId: bigint;
  name: string;
  description: string;
  image_url: string;
  metadataJSON_url: string;
  createdAt: Date;
  updatedAt: Date;
  blockTimestamp: Date;
  playerId: number;
}
