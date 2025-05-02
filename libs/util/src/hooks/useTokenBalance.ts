import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from './useAccount';
import { getProvider } from './getProvider';
import { ERC20Upgradeable__factory } from '../../../../standalone/soulBase-contract/typechain-types';

export const useTokenBalance = (tokenAddress) => {
  const [balance, setBalance] = useState('0');
  const { account } = useAccount();

  const fetchTokenBalance = async () => {
    if (!account || !tokenAddress) return;
    try {
      const provider = await getProvider();
      //const token = new ethers.Contract(tokenAddress,erc20abi, provider)
      const token = ERC20Upgradeable__factory.connect(tokenAddress, provider);
      const balance = await token.balanceOf(account);
      const decimals = await token.decimals();
      const formattedBalance = ethers.formatUnits(balance, decimals);
      setBalance(formattedBalance);
    } catch (error) {
      console.error('Error fetching token balance:', error);
    }
  };
  fetchTokenBalance();

  return balance;
};
