const hre = require('hardhat');

async function main() {
  const contractAddress = '0xf20A99CF895c89E5a0770CE106a94b96e81FfaF8';

  const BaseballToken = await hre.ethers.getContractFactory('BaseballToken');
  const baseballToken = await BaseballToken.attach(contractAddress);

  const ownerAddress = await baseballToken.owner();

  console.log('Contract owner address:', ownerAddress); //계약의 owner 확인
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
