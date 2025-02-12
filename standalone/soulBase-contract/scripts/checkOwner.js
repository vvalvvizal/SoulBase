const hre = require('hardhat');

async function main() {
  const contractAddress = '0xf20A99CF895c89E5a0770CE106a94b96e81FfaF8';

  const MyERC20 = await hre.ethers.getContractFactory('MyERC20');
  const myERC20 = await MyERC20.attach(contractAddress);

  const ownerAddress = await myERC20.owner();

  console.log('Contract owner address:', ownerAddress); //계약의 owner 확인
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
