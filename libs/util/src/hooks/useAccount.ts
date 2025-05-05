import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

export const useAccount = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const initializeWeb3Provider = async () => {
    if (!window?.ethereum) {
      alert('Non-Ethereum browser detected. Try MetaMask.');
      return;
    }

    const AMOY_CHAIN_ID = '0x13882';

    try {
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (currentChainId !== AMOY_CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: AMOY_CHAIN_ID,
              chainName: 'Amoy',
              nativeCurrency: { name: 'Polygon', symbol: 'POL', decimals: 18 },
              rpcUrls: [`https://polygon-amoy.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`],
              blockExplorerUrls: ['https://amoy.polygonscan.com/'],
            },
          ],
        });

        await new Promise((res) => setTimeout(res, 500));
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.formatEther(balance));
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return {
    account,
    balance,
    isConnected,
    initializeWeb3Provider,
  };
};
