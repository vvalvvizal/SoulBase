// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const BaseballTokenRouterModule = buildModule(
  'BaseballTokenRouterModule',
  (m) => {
    const LiquidityPool = '0xed47F0b946EDfD3A182CaD5341b452F22E447828';
    const BBTAddress = '0xaAE7534666Bc96A689bf91Fec93Ee7c5708Bf3Ac';
    const BaseballTokenRouter = m.contract('BaseballTokenRouter', [
      LiquidityPool,
      BBTAddress,
    ]);

    return { BaseballTokenRouter };
  },
);

export default BaseballTokenRouterModule;
