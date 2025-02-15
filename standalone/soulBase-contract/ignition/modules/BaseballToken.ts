// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const BaseballTokenModule = buildModule('BaseballTokenModule', (m) => {
  const treasuryAddress = '0xAcDaA861e7e7f16198E2Ca914154539A31e246E4';
  const BaseballToken = m.contract('BaseballToken', [treasuryAddress]);

  return { BaseballToken };
});

export default BaseballTokenModule;
