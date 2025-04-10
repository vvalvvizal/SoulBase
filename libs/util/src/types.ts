import { ReactNode, ElementType } from 'react';
import { Icon as IconType } from '@tabler/icons-react';

export type MenuIem = {
  label: string;
  href: string;
  Icon: IconType;
};

export type BaseComponent = {
  children?: ReactNode;
  className?: string;
};
