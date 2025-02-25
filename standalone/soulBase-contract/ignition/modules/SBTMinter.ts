// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const SBTMinterModule = buildModule('SBTMinterModule', (m) => {
  const SBTAddress = '0xf9EF8B164c3D1bc35D749bb14A74a87962e965f1';
  const SBTMinter = m.contract('SBTMinter', [SBTAddress]);

  return { SBTMinter };
});

export default SBTMinterModule;
