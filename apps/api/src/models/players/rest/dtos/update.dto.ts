import { PartialType } from '@nestjs/swagger'
import { CreatePlayer } from './create.dto'
import { Player } from '@prisma/client'

export class UpdatePlayer extends PartialType(CreatePlayer) {
  id: Player['id']
}

