import { Field, ObjectType, registerEnumType, Int } from '@nestjs/graphql';
import { $Enums, User as UserType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

// Enum 타입을 GraphQL에 등록
registerEnumType($Enums.User_Type, {
  name: 'UserType',
});
@ObjectType()
export class User
  implements RestrictProperties<User, Omit<UserType, 'isAdmin'>>
{
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;

  @Field(() => $Enums.User_Type)
  isPlayer: $Enums.User_Type;

  @Field(() => String) //Date를 String으로 처리
  createdAt: Date;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
