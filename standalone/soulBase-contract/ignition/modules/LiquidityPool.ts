// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const LiquidityPoolModule = buildModule('LiquidityPoolModule', (m) => {
  const BBTAddress = '0x96a78D45dAf135CB58CB04737061af35a3256930';
  const LiquidityPool = m.contract('LiquidityPool', [BBTAddress]);

  return { LiquidityPool };
});

export default LiquidityPoolModule;
