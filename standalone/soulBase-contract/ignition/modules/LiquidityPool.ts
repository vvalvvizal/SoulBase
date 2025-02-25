// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const LiquidityPoolModule = buildModule('LiquidityPoolModule', (m) => {
  const BBTAddress = '0x49Fb84a9b30B20dcb9698c12c04f89D1412b8D76';
  const LiquidityPool = m.contract('LiquidityPool', [BBTAddress]);

  return { LiquidityPool };
});

export default LiquidityPoolModule;
