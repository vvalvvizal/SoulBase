import { Player } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class PlayerEntity implements RestrictProperties<PlayerEntity, Player> {
  id: number;
  name: string;
  createdAt: Date;
  userId: number;
}
