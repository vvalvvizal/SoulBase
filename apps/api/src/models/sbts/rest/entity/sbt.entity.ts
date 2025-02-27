import { Sbt } from '@prisma/client'
import { IsDate, IsString, IsInt } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class SbtEntity implements RestrictProperties<SbtEntity, Sbt> {

}

