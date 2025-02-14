import { ethers } from 'ethers';
import { contractAddress } from './util';
import { MyERC20__factory } from '../../standalone/soulBase-contract/typechain-types';

import 'dotenv/config';

const main = async () => {
  const infuraWssUrl = `wss://polygon-amoy.infura.io/ws/v3/${process.env.INFURA_KEY}`;
  console.log(`Connecting to WebSocket: ${infuraWssUrl}`);

  const provider = new ethers.WebSocketProvider(infuraWssUrl);

  try {
    await provider.ready;
    console.log('WebSocket connected');
  } catch (error) {
    console.error('Error connecting to WebSocket:', error);
    return;
  }
  const contract = MyERC20__factory.connect(contractAddress, provider);

  contract.on(contract.filters['MyERC20Minted'], (account, amount) => {
    console.log(
      `Event:  ${amount.toString()} MyERC20 Token Minted for ${account}🪙`,
    );
  });

  console.log('Event: MyERC20Minted Listening...');
};
main();
