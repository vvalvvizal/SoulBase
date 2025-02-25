// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const BaseballTokenRouterModule = buildModule(
  'BaseballTokenRouterModule',
  (m) => {
    const LiquidityPool = '0x18e4A07A371d7fbCEb16e5AFC0E36bb0E8C8CF7D';
    const BBTAddress = '0x49Fb84a9b30B20dcb9698c12c04f89D1412b8D76';
    const BaseballTokenRouter = m.contract('BaseballTokenRouter', [
      LiquidityPool,
      BBTAddress,
    ]);

    return { BaseballTokenRouter };
  },
);

export default BaseballTokenRouterModule;
