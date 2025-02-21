import { ethers } from 'ethers';
import { BBTcontractAddress } from './util';
import { BaseballToken__factory } from '../../standalone/soulBase-contract/typechain-types';

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
  const contract = BaseballToken__factory.connect(BBTcontractAddress, provider);

  try {
    contract.on(contract.filters['BaseballTokenMinted'], (account, amount) => {
      console.log(
        `Event:  ${amount.toString()} Baseball Token Minted for ${account}🪙`,
      );
    });

    console.log('Event: BaseballTokenMinted Listening...');
  } catch (error) {
    console.log('BaseballMinted event error', error);
  }
};
main();
