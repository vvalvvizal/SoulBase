import { OmitType } from '@nestjs/swagger'
import { PlayerEntity } from '../entity/player.entity'

export class CreatePlayer extends OmitType(PlayerEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
