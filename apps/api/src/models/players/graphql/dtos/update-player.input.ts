import { CreatePlayerInput } from './create-player.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Player } from '@prisma/client'

@InputType()
export class UpdatePlayerInput extends PartialType(CreatePlayerInput) {
  id: Player['id']
}
