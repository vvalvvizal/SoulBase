import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount } from './useAccount';
import { getProvider } from './getProvider';
import { ERC20Upgradeable__factory } from '../../../../standalone/soulBase-contract/typechain-types';
import { POL_TOKEN_INFO } from '../../../ui/src/components/organisms/TokenInput';

export const useTokenBalance = (tokenAddress: string) => {
  const { account, balance: ethBalance, initializeWeb3Provider } = useAccount();
  const [tokenBalance, setTokenBalance] = useState('0');

  useEffect(() => {
    initializeWeb3Provider();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!account) return;
      if (!tokenAddress || tokenAddress === POL_TOKEN_INFO.address) {
        setTokenBalance(ethBalance);
      } else {
        try {
          const provider = await getProvider();
          const bbtToken = ERC20Upgradeable__factory.connect(tokenAddress, provider);
          const rawBalance = await bbtToken.balanceOf(account);
          const formatted = ethers.formatEther(rawBalance);
          setTokenBalance(formatted);
        } catch (error) {
          console.error('Error fetching ERC20 balance:', error);
        }
      }
    };

    fetchBalance();
  }, [account, tokenAddress, ethBalance]);

  return tokenBalance;
};
