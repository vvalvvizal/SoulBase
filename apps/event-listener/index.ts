import { ethers } from 'ethers';
import { BBTcontractAddress, LPcontractAddress } from './util';
import { BaseballToken__factory } from '../../standalone/soulBase-contract/typechain-types';
import { LiquidityPool__factory } from '../../standalone/soulBase-contract/typechain-types';

import 'dotenv/config';

const main = async () => {
  const RPCproviderUrl = `wss://polygon-amoy.infura.io/ws/v3/${process.env.INFURA_KEY}`;
  //const RPCproviderUrl = `wss://wild-dimensional-snow.matic-amoy.quiknode.pro/${process.env.QUICKNODE_KEY}/`
  console.log(`Connecting to WebSocket: ${RPCproviderUrl}`);

  const provider = new ethers.WebSocketProvider(RPCproviderUrl);
  //const provider = new ethers.WebSocketProvider(RPCproviderUrl);
  //BBT Minted Event
  try {
    await provider.ready;
    console.log('WebSocket connected');
  } catch (error) {
    console.error('Error connecting to WebSocket:', error);
    return;
  }
  const bbtcontract = BaseballToken__factory.connect(
    BBTcontractAddress,
    provider,
  );
  const lpcontract = LiquidityPool__factory.connect(
    LPcontractAddress,
    provider,
  );

  try {
    bbtcontract.on(
      bbtcontract.filters['BaseballTokenMinted'],
      (account, amount) => {
        console.log(
          `Event:  ${amount.toString()} Baseball Token Minted for ${account}`,
        );
      },
    );

    console.log('Event: BaseballTokenMinted Listening...');
  } catch (error) {
    console.error('BaseballMinted event error', error);
  }

  // SWAP EVENT
  try {
    lpcontract.on(
      lpcontract.filters['TradedTokens'],
      (account, ethTraded, tokenTraded) => {
        console.log(
          `Event: ${account} traded ${ethTraded.toString()} ETH - ${tokenTraded.toString()} BBT`,
        );
      },
    );

    console.log('Event: TradedTokens Listening...');
  } catch (error) {
    console.error('TradedTokens event error', error);
  }

  // ADD LIQUIDITY EVENT
  try {
    lpcontract.on(
      lpcontract.filters['LiquidityAdded'],
      (account, liquidity) => {
        console.log(
          `Event: ${account} added ${liquidity.toString()} BBT to liquidityPool`,
        );
      },
    );

    console.log('Event: LiquidityAdded Listening...');
  } catch (error) {
    console.error('LiquidityAdded event error', error);
  }
};
main();
