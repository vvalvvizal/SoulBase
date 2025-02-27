import { InputType, PickType } from '@nestjs/graphql'
import { Player } from '../entity/player.entity'

@InputType()
export class CreatePlayerInput extends PickType(Player,[],InputType) {}

