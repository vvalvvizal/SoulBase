import { SBT } from '@prisma/client';

import { RestrictProperties } from 'src/common/dtos/common.input';

export class SBTEntity implements RestrictProperties<SBTEntity, SBT> {
  name: string;
  id: number;
  tokenId: bigint;
  description: string;
  image_url: string;
  metadataJSON_url: string;
  createdAt: Date;
  updatedAt: Date;
  blockTimestamp: Date;
  playerId: number;
}
