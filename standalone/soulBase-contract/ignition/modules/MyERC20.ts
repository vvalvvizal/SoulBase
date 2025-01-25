// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const MyERC20Module = buildModule('MyERC20Module', (m) => {
  const MyERC20 = m.contract('MyERC20', []);

  return { MyERC20 };
});

export default MyERC20Module;
