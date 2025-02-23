// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const LiquidityPoolModule = buildModule('LiquidityPoolModule', (m) => {
  const BBTAddress = '0xE3fA7A2dFF3f9D5ede4adD2c82Bbd341B33b3bDD';
  const LiquidityPool = m.contract('LiquidityPool', [BBTAddress]);

  return { LiquidityPool };
});

export default LiquidityPoolModule;
