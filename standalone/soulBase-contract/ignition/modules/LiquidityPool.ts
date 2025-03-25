// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const LiquidityPoolModule = buildModule('LiquidityPoolModule', (m) => {
  const BBTAddress = '0x7ff09C7b0D70E15545b964c766a4d1F4E35fE6f1';
  const LiquidityPool = m.contract('LiquidityPool', [BBTAddress]);

  return { LiquidityPool };
});

export default LiquidityPoolModule;
