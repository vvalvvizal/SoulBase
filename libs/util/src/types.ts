import { ReactNode } from 'react';
import { Icon as IconType } from '@tabler/icons-react';
import {
  BaseballToken,
  BaseballTokenRouter,
  LiquidityPool,
  SBTRouter,
} from '../../../standalone/soulBase-contract/typechain-types';

export type MenuItem = {
  label: string;
  href: string;
  Icon: IconType;
};

export type BaseComponent = {
  children?: ReactNode;
  className?: string;
};

export type SBTActionType<T = string> = {
  contract: SBTRouter;
  payload: T;
};

export type BBTActionType<T = string> = {
  BBTContract?: BaseballToken;
  BBTRouterContract?: BaseballTokenRouter; //라우터
  payload: T;
};

export type LPActionType<T = string> = {
  //풀에 직접 접근
  contract: LiquidityPool;
  payload: T;
};

type LPTransactionType = 'SWAP' | 'ADD_LIQUIDITY' | 'REMOVE_LIQUIDITY';

export interface LPTransaction {
  type: LPTransactionType;
  tokenAmount: string;
  ethAmount: string;
  account: string;
  timestamp: number;
  txHash: string;
}

export type UserProvided = {
  polSum: string;
  bbtSum: string;
  rawPolSum: bigint;
  rawBbtSum: bigint;
};

export type MetadataType = {
  name: string;
  description: string;
  image: string;
  player: string;
  team: string;
  season: string;
  achievement: string;
  imgsource: string;
};
