import { $Enums, User } from '@prisma/client';

import { RestrictProperties } from 'src/common/dtos/common.input';

export class UserEntity implements RestrictProperties<UserEntity, User> {
  isAdmin: boolean;
  id: number;
  name: string;
  createdAt: Date;
  address: string;
  isPlayer: $Enums.User_Type;
}
