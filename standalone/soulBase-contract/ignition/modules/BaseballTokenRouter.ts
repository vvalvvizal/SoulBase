// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { ethers } from 'hardhat';
import fs from 'fs';
import path from 'path';

function loadAddress(fileName: string): string {
  const filePath = path.join(__dirname, '..', '..', fileName);
  return fs.readFileSync(filePath, 'utf8').trim();
}

const BaseballTokenRouterModule = buildModule(
  'BaseballTokenRouterModule',
  (m) => {
    const LiquidityPool = loadAddress('proxyContract_LP.txt');
    const BBTAddress = loadAddress('proxyContract_BBT.txt');

    const BaseballTokenRouter = m.contract('BaseballTokenRouter', [
      LiquidityPool,
      BBTAddress,
    ]);

    return { BaseballTokenRouter };
  },
);

export default BaseballTokenRouterModule;
