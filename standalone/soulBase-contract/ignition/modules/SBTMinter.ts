// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const SBTMinterModule = buildModule('SBTMinterModule', (m) => {
  const SBTAddress = '0x0A976b28321370e4e207584D4F4A9A1c9Fa93bC1';
  const SBTMinter = m.contract('SBTMinter', [SBTAddress]);

  return { SBTMinter };
});

export default SBTMinterModule;
