import { ethers } from 'ethers';
import { contractAddress } from './util';
import { MyERC20__factory } from '../../standalone/soulBase-contract/typechain-types';

import 'dotenv/config';

const main = () => {
  const infuraWssUrl = `wss://polygon-amoy.infura.io/v3/${process.env.INFURA_KEY}`;

  const provider = new ethers.WebSocketProvider(infuraWssUrl);

  const contract = MyERC20__factory.connect(contractAddress, provider);

  try {
    contract.on(contract.filters['MyERC20Minted'], () => {
      console.log(`Event: MyERC20 Token Minted 🪙`);
    });

    console.log('Event: MyERC20Minted Listening...');
  } catch (error) {
    console.error('Event: MyERC20Minted: Listener setup failed', error);
  }
};
main();
