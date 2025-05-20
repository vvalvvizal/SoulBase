import { MenuItem } from '@soulBase/util/src/types';
import { Link } from 'react-router-dom';

export interface IMenuItemProps {
  menuItems: MenuItem[];
}

export const Menus = ({ menuItems }: IMenuItemProps) => {
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
