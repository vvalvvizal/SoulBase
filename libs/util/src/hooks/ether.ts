<<<<<<< HEAD
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
>>>>>>> main
import { useEffect, useState } from 'react';
import {
  AchievementSBT,
  AchievementSBT__factory,
} from '../../../../standalone/soulBase-contract/typechain-types';
import { SBTcontractAddress } from '../contract';
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

<<<<<<< HEAD
    const AMOY_CHAIN_ID = '0x13882';

    try {

      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (currentChainId !== AMOY_CHAIN_ID) {
=======
    try {
>>>>>>> main
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x13882',
            chainName: 'Amoy',
            nativeCurrency: {
              name: 'Polygon',
              symbol: 'POL',
              decimals: 18,
            },
            blockExplorerUrls: ['https://amoy.polygonscan.com/'],
            rpcUrls: [
              `https://polygon-amoy.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`,
            ],
          },
        ], //80002 -> hex로
      });
<<<<<<< HEAD

      await new Promise((res) => setTimeout(res, 500)); 
    }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setIsConnected(true);
        
=======
      setIsConnected(true);
      await fetchBlockchainData();
>>>>>>> main
    } catch (error) {
      console.error(
        'User denied account access or failed to add network',
        error,
      );
    }
  };

  const fetchBlockchainData = async () => {
    if (!window?.ethereum) {
      console.error('Ethereum object not found.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();
      const contract = AchievementSBT__factory.connect(
        SBTcontractAddress,
        signer,
      );
      setContract(contract);

      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts && accounts.length > 0) {
        const account = accounts[0];
        setAccount(account); //useState

        const balance = await provider.getBalance(account);
        setBalance(ethers.formatEther(balance));

        const contractOwner = await contract.owner();
        setIsOwner(accounts.toLowerCase() === contractOwner.toLowerCase());
      } else {
        console.error('No accounts detected');
        return;
      }
    } catch (error) {
      /* empty */
    }
  };
  useEffect(() => {
    if (!isConnected) return;
    fetchBlockchainData();
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
