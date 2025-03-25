// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const SBTRouterModule = buildModule('SBTRouterModule', (m) => {
  const SBTAddress = '0x1F006D6ae804ebE5cA917A3E2664df313FBf3e98';
  const SBTRouter = m.contract('SBTRouter', [SBTAddress]);

  return { SBTRouter };
});

export default SBTRouterModule;
