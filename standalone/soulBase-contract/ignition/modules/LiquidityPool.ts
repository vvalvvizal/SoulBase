// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const LiquidityPoolModule = buildModule('LiquidityPoolModule', (m) => {
  const BBTAddress = '0xaAE7534666Bc96A689bf91Fec93Ee7c5708Bf3Ac';
  const LiquidityPool = m.contract('LiquidityPool', [BBTAddress]);

  return { LiquidityPool };
});

export default LiquidityPoolModule;
