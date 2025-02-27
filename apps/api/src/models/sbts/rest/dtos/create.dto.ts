import { OmitType } from '@nestjs/swagger'
import { SbtEntity } from '../entity/sbt.entity'

export class CreateSbt extends OmitType(SbtEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
