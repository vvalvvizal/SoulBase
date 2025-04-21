import { MenuItem } from '@soulBase/util/src/types';
import { useState } from 'react';
import { useDialogState } from '@soulBase/util/src/hooks/dialog';
import { Sidebar } from './Sidebar';
import { UserInfo } from './UserInfo';
import { Menus } from './Menu';
import Button from '../atmos/Button';

export interface INavSidebarProps {
  menuItems: MenuItem[];
}

export const NavSidebar = ({ menuItems }: INavSidebarProps) => {
  const [open, setOpen] = useDialogState(false);
  return (
    <>
      <Button
        type="button"
        className="p-2"
        onClick={() => setOpen((state) => !state)}
        aria-label="Open main menu"
      >
        버튼
      </Button>
      <Sidebar open={open} setOpen={setOpen} blur={false}>
        <UserInfo className="mb-8" />
        <div className="flex flex-col items-start gap-3">
          <Menus menuItems={menuItems} />
        </div>
      </Sidebar>
    </>
  );
};
