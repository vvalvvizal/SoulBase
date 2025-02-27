import { ObjectType } from '@nestjs/graphql'
import { Player as PlayerType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Player implements RestrictProperties<Player,PlayerType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
