import { MenuItem } from '@soulBase/util/src/types';
import {
  IconHome,
  IconBook,
  IconCoin,
  IconExchange,
  IconCylinderPlus,
} from '@tabler/icons-react';
import { Container } from '../../components/atmos/Container';
import { useLocation, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Menus } from './Menu';
import { NavSidebar } from './NavSidebar';
import { useAccount } from '@soulBase/util/src/hooks/useAccount';
import { useEffect, useState } from 'react';
import { useContracts } from '@soulBase/util/src/hooks/useContracts';
import { checkOwner } from '@soulBase/util/src/checkOwner';
import { Contract } from 'ethers';

export const Header = () => {
  const { initializeWeb3Provider, isConnected, account } = useAccount();
  const { SBTRouterContract } = useContracts(account, isConnected);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    initializeWeb3Provider();
  }, []);

  useEffect(() => {
    const fetchOwner = async () => {
      if (SBTRouterContract && account) {
        const ownerStatus = await checkOwner(SBTRouterContract, account);
        setIsOwner(ownerStatus);
      }
    };
    fetchOwner();
  }, [SBTRouterContract, account]);

  const MENUITEMS: MenuItem[] = [
    { label: 'Home', href: '/', Icon: IconHome },
    { label: 'My Collection', href: `/user`, Icon: IconBook },
    ...(isOwner
      ? [{ label: 'SBT Mint', href: `/sbtmint`, Icon: IconCoin }]
      : []),
    { label: 'Swap', href: `/swap`, Icon: IconExchange },
    { label: 'Pool', href: `/pool`, Icon: IconCylinderPlus },
  ];

  return (
    <header>
      <nav className="flexed z-50 top-0 w-full bg-white">
        <Container className="relative flex items-center justify-between h-16 py-2">
          <div className="relative flex items-center justify-between w-full gap-16">
            <Link to="/" aria-label="home" className="w-auto z-50">
              <Logo />
            </Link>
            <div className="flex items-center gap-2">
              <div className="text-sm mr-6 gap-5 hidden md:flex">
                <Menus menuItems={MENUITEMS} />
              </div>
              <NavSidebar menuItems={MENUITEMS} />
            </div>
          </div>
        </Container>
      </nav>
      <div className="w-16" />
    </header>
  );
};
