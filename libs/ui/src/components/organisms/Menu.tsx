import { MenuItem } from '@soulBase/util/src/types';
import { useLocation, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export interface IMenuItemProps {
  menuItems: MenuItem[];
}

export const Menus = ({ menuItems }: IMenuItemProps) => {
  const pathname = useLocation().pathname; // 현재 페이지 경로
  const initialPathname = useRef(pathname); // 초기 경로

  return (
    <>
      {menuItems.map(({ label, href, Icon }) => (
        <Link
          className="hover:underline underline-offset-8"
          key={label}
          to={href} // Next는 href, react는 to
        >
          <div className="flex gap-1 items-center font-medium text-lg">
            <Icon /> {label}
          </div>
        </Link>
      ))}
    </>
  );
};
