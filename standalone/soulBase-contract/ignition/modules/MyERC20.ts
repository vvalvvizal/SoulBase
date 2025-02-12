// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const MyERC20Module = buildModule('MyERC20Module', (m) => {
  const treasuryAddress = '0xAcDaA861e7e7f16198E2Ca914154539A31e246E4';
  const MyERC20 = m.contract('MyERC20', [treasuryAddress]);

  return { MyERC20 };
});

export default MyERC20Module;
