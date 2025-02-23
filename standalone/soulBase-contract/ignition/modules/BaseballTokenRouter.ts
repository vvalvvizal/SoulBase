// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const BaseballTokenRouterModule = buildModule(
  'BaseballTokenRouterModule',
  (m) => {
    const LiquidityPool = '0x0626DD1f1814327463c993B5D642A6cE70Cc17FF';
    const BBTAddress = '0xE3fA7A2dFF3f9D5ede4adD2c82Bbd341B33b3bDD';
    const BaseballTokenRouter = m.contract('BaseballTokenRouter', [
      LiquidityPool,
      BBTAddress,
    ]);

    return { BaseballTokenRouter };
  },
);

export default BaseballTokenRouterModule;
