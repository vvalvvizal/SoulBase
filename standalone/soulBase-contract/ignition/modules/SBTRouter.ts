// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const SBTRouterModule = buildModule('SBTRouterModule', (m) => {
  const SBTAddress = '0x22e86C513905dfc55749004Af0d68E6D5eDBCC14';
  const SBTRouter = m.contract('SBTRouter', [SBTAddress]);

  return { SBTRouter };
});

export default SBTRouterModule;
