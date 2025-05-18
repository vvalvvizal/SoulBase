import { HardhatUserConfig } from 'hardhat/config';
import '@openzeppelin/hardhat-upgrades';
import '@nomicfoundation/hardhat-toolbox';
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: '0.8.13',
  defaultNetwork: 'polygonAmoy',
  networks: {
    polygonAmoy: {
      url: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_KEY}`,
      //url : `https://wild-dimensional-snow.matic-amoy.quiknode.pro/${process.env.QUICKNODE_KEY}/`,
      accounts: [process.env.PRIVATE_KEY || ''],
    },
  },
  etherscan: {
    apiKey: {
      polygonAmoy: `${process.env.POLYGONSCAN_API_KEY}`,
    },
  },
};
export default config;
