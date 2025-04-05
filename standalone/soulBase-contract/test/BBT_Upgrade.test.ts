import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';

describe('BaseballToken', function () {
  it('check version value', async () => {
    const BaseballToken = await ethers.getContractFactory('BaseballToken');
    const BaseballTokenV2 = await ethers.getContractFactory('BaseballTokenV2');

    const instance = await upgrades.deployProxy(
      BaseballToken,
      ['0xAcDaA861e7e7f16198E2Ca914154539A31e246E4'],
      {
        kind: 'uups',
      },
    );
    await instance.waitForDeployment();

    await upgrades.upgradeProxy(await instance.getAddress(), BaseballTokenV2);

    const upgraded = await upgrades.upgradeProxy(
      await instance.getAddress(),
      BaseballTokenV2,
    );

    const version = await upgraded.version();

    expect(version.toString()).to.equal('2');
  });
});
