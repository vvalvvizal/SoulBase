// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';

const AchievementSBTModule = buildModule('AchievementSBTModule', (m) => {
  const name = 'AchievementSBT';
  const symbol = 'SBT';
  const isLocked = true;

  const AchievementSBT = m.contract('AchievementSBT', [name, symbol, isLocked]);

  return { AchievementSBT };
});

export default AchievementSBTModule;
