/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { AchievementSBT } from '../../../../standalone/soulBase-contract/typechain-types';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

export const useAccount = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [contract, setContract] = useState<AchievementSBT | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const initializeWeb3Provider = async () => {
    if (!window?.ethereum) {
      alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask',
      );

      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x13882',
            chainName: 'Polygon Amoy Testnet',
            nativeCurrency: {
              name: 'Polygon',
              symbol: 'POL',
              decimals: 18,
            },
            blockExplorerUrls: ['https://amoy.polygonscan.com/'],
            rpcUrls: [
              `https://polygon-amoy.infura.io/v3/${import.meta.env.VITE_INFRA_KEY}`,
            ],
          },
        ], //80002 -> hex로
      });
      setIsConnected(true);
    } catch (error) {
      console.error(
        'User denied account access or failed to add network',
        error,
      );
    }
  };
  useEffect(() => {
    if (isConnected) {
      console.log('web3 provider connected!');
    }

    //initializeWeb3Provider

    //Fetch blockchain information
  }, [isConnected]);

  return {
    account,
    balance,
    isOwner,
    contract,
    isConnected,
    initializeWeb3Provider,
  };
};
