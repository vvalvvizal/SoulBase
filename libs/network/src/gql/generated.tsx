import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any; }
};

export type Player = {
  __typename?: 'Player';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type PlayerOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  sbts?: InputMaybe<SortOrder>;
  user?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export enum PlayerScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UserId = 'userId'
}

export type PlayerWhereInput = {
  AND?: InputMaybe<Array<PlayerWhereInput>>;
  NOT?: InputMaybe<Array<PlayerWhereInput>>;
  OR?: InputMaybe<Array<PlayerWhereInput>>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sbts?: InputMaybe<SbtWhereInput>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type PlayerWhereUniqueInput = {
  id: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  SBT?: Maybe<Sbt>;
  SBTs: Array<Sbt>;
  player: Player;
  players: Array<Player>;
  user: User;
  users: Array<User>;
};


export type QuerySbtArgs = {
  where: SbtWhereUniqueInput;
};


export type QuerySbTsArgs = {
  cursor?: InputMaybe<SbtWhereUniqueInput>;
  distinct?: InputMaybe<Array<SbtScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SbtOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<SbtWhereInput>;
};


export type QueryPlayerArgs = {
  where: PlayerWhereUniqueInput;
};


export type QueryPlayersArgs = {
  cursor?: InputMaybe<PlayerWhereUniqueInput>;
  distinct?: InputMaybe<Array<PlayerScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PlayerOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<PlayerWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<UserWhereInput>;
};

export type Sbt = {
  __typename?: 'SBT';
  blockTimestamp: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image_url: Scalars['String']['output'];
  metadataJSON_url: Scalars['String']['output'];
  name: Scalars['String']['output'];
  playerId: Scalars['Int']['output'];
  tokenId: Scalars['BigInt']['output'];
  updatedAt: Scalars['String']['output'];
};

export type SbtOrderByWithRelationInput = {
  blockTimestamp?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image_url?: InputMaybe<SortOrder>;
  metadataJSON_url?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  player?: InputMaybe<SortOrder>;
  playerId?: InputMaybe<SortOrder>;
  tokenId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum SbtScalarFieldEnum {
  BlockTimestamp = 'blockTimestamp',
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  ImageUrl = 'image_url',
  MetadataJsonUrl = 'metadataJSON_url',
  Name = 'name',
  PlayerId = 'playerId',
  TokenId = 'tokenId',
  UpdatedAt = 'updatedAt'
}

export type SbtWhereInput = {
  AND?: InputMaybe<Array<SbtWhereInput>>;
  NOT?: InputMaybe<Array<SbtWhereInput>>;
  OR?: InputMaybe<Array<SbtWhereInput>>;
  blockTimestamp?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  metadataJSON_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  player?: InputMaybe<PlayerWhereInput>;
  playerId?: InputMaybe<Scalars['Int']['input']>;
  tokenId?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
};

export type SbtWhereUniqueInput = {
  id: Scalars['Int']['input'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isPlayer: UserType;
  name: Scalars['String']['output'];
};

export type UserOrderByWithRelationInput = {
  Player?: InputMaybe<SortOrder>;
  address?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isAdmin?: InputMaybe<SortOrder>;
  isPlayer?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export enum UserScalarFieldEnum {
  Address = 'address',
  CreatedAt = 'createdAt',
  Id = 'id',
  IsAdmin = 'isAdmin',
  IsPlayer = 'isPlayer',
  Name = 'name'
}

export enum UserType {
  Fan = 'FAN',
  Player = 'PLAYER'
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  Player?: InputMaybe<PlayerWhereInput>;
  address?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  isPlayer?: InputMaybe<UserType>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UserWhereUniqueInput = {
  id: Scalars['Int']['input'];
};

export type SbtFieldsFragment = { __typename?: 'SBT', id: number, tokenId: any, name: string, description: string, image_url: string, metadataJSON_url: string };

export type SbtQueryVariables = Exact<{
  where: SbtWhereUniqueInput;
}>;


export type SbtQuery = { __typename?: 'Query', SBT?: { __typename?: 'SBT', id: number, tokenId: any, name: string, description: string, image_url: string, metadataJSON_url: string } | null };

export type SbTsQueryVariables = Exact<{
  distinct?: InputMaybe<Array<SbtScalarFieldEnum> | SbtScalarFieldEnum>;
  where?: InputMaybe<SbtWhereInput>;
  orderBy?: InputMaybe<Array<SbtOrderByWithRelationInput> | SbtOrderByWithRelationInput>;
  cursor?: InputMaybe<SbtWhereUniqueInput>;
  take?: InputMaybe<Scalars['Float']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
}>;


export type SbTsQuery = { __typename?: 'Query', SBTs: Array<{ __typename?: 'SBT', id: number, tokenId: any, name: string, description: string, image_url: string, metadataJSON_url: string }> };

export const namedOperations = {
  Query: {
    SBT: 'SBT',
    SBTs: 'SBTs'
  },
  Fragment: {
    SBTFields: 'SBTFields'
  }
}
export const SbtFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SBTFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SBT"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"metadataJSON_url"}}]}}]} as unknown as DocumentNode<SbtFieldsFragment, unknown>;
export const SbtDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SBT"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SBTWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SBT"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SBTFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SBTFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SBT"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"metadataJSON_url"}}]}}]} as unknown as DocumentNode<SbtQuery, SbtQueryVariables>;
export const SbtsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SBTs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"distinct"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SBTScalarFieldEnum"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SBTWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SBTOrderByWithRelationInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SBTWhereUniqueInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SBTs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"distinct"},"value":{"kind":"Variable","name":{"kind":"Name","value":"distinct"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SBTFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SBTFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SBT"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"metadataJSON_url"}}]}}]} as unknown as DocumentNode<SbTsQuery, SbTsQueryVariables>;