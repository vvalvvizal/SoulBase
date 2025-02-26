// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const SBTRouterModule = buildModule('SBTRouterModule', (m) => {
  const SBTAddress = '0xD258Eaaf65327b168cE354fD8e13Fc5d9Adf9888';
  const SBTRouter = m.contract('SBTRouter', [SBTAddress]);

  return { SBTRouter };
});

export default SBTRouterModule;
