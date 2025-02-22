// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const BaseballTokenRouterModule = buildModule(
  'BaseballTokenRouterModule',
  (m) => {
    const LiquidityPool = '0xcB6361df982e265F41F824070e2ea1564C0C0d7E';
    const BBTAddress = '0x96a78D45dAf135CB58CB04737061af35a3256930';
    const BaseballTokenRouter = m.contract('BaseballTokenRouter', [
      LiquidityPool,
      BBTAddress,
    ]);

    return { BaseballTokenRouter };
  },
);

export default BaseballTokenRouterModule;
