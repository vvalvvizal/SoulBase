// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const SBTMinterModule = buildModule('SBTMinterModule', (m) => {
  const SBTAddress = '0x5F0228D87d9DA668d121b4D17BE90f2740B8c6aB';
  const SBTMinter = m.contract('SBTMinter', [SBTAddress]);

  return { SBTMinter };
});

export default SBTMinterModule;
