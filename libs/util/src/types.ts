import { ReactNode } from 'react';
import { Icon as IconType } from '@tabler/icons-react';
import { BaseballToken,BaseballTokenRouter, SBTRouter } from '../../../standalone/soulBase-contract/typechain-types';


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


export type BBTActionType<T=string>={
  BBTContract : BaseballToken;
  BBTRouterContract : BaseballTokenRouter;
  payload: T;
}

