import { PartialType } from '@nestjs/swagger'
import { CreateSbt } from './create.dto'
import { Sbt } from '@prisma/client'

export class UpdateSbt extends PartialType(CreateSbt) {
  id: Sbt['id']
}

