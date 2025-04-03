import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';

describe('Implementation', function () {
  it('keeps the initial value after upgrade', async () => {
    const Implementation = await ethers.getContractFactory('Implementation');
    const ImplementationV2 =
      await ethers.getContractFactory('ImplementationV2');

    const instance = await upgrades.deployProxy(Implementation, [42], {
      kind: 'uups',
    });
    await instance.waitForDeployment();

    const upgraded = await upgrades.upgradeProxy(
      await instance.getAddress(),
      ImplementationV2,
    );

    const value = await upgraded.retrieveValue();
    expect(value.toString()).to.equal('42');
  });
});
