import { useEffect, useState, useMemo } from 'react';
import { useAccount } from './useAccount';
import { useContracts } from './useContracts';
import { usePoolStatus } from './usePoolStatus';
import { usePoolEvent } from './usePoolEvent';
import { formatEther } from 'ethers';

export const useUserPoolStatus = () => {
  const [userLPAmount, setUserLPAmount] = useState<number>(0);
  const [userLiquidityShare, setUserLiquidityShare] = useState<number>(0);

  const { userPOLprovided, userBBTprovided } = usePoolEvent();
  const { account, isConnected, initializeWeb3Provider } = useAccount();
  const { LPcontract } = useContracts(account, isConnected);
  const { totalLPSupply, POLAmount, BBTAmount,fetchPoolStatus } = usePoolStatus();

  useEffect(() => {
    initializeWeb3Provider();
    fetchPoolStatus();
  }, [account,LPcontract]);

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!account || !LPcontract || !totalLPSupply) return;
      try {
        const userLP:bigint = await LPcontract.balanceOf(account);
        const userLPnum = Number(formatEther(userLP));
        setUserLPAmount(userLPnum);
        setUserLiquidityShare(totalLPSupply > 0 ? (userLPnum / totalLPSupply) * 100 : 0);
      } catch (error) {
        console.error('Error fetching user LP status:', error);
      }
    };

    fetchUserStatus();
  }, [account, LPcontract, totalLPSupply]);

  // 파생값은 useMemo로 관리

  const userWithdrawablePOL = useMemo(() => {
    if (!totalLPSupply) return 0;
    return (POLAmount * userLPAmount) / totalLPSupply; //user가 실제 인출 가능한 POL, 풀의 pol 수량에서 내 지분만큼
  }, [POLAmount, userLPAmount, totalLPSupply]);


  //user가 실제 인출 가능한 BBT
  const userWithdrawableToken = useMemo(() => {
    if (!totalLPSupply) return 0;
    return (BBTAmount * userLPAmount) / totalLPSupply;
  }, [BBTAmount, userLPAmount, totalLPSupply]);

  const polProfit = useMemo(() => userWithdrawablePOL - userPOLprovided, [userWithdrawablePOL, userPOLprovided]);
  const bbtProfit = useMemo(() => userWithdrawableToken - userBBTprovided, [userWithdrawableToken, userBBTprovided]);

  const polYieldPercent = useMemo(() => {
    return userPOLprovided > 0 ? (polProfit / userPOLprovided) * 100 : 0;
  }, [polProfit, userPOLprovided]);

  const bbtYieldPercent = useMemo(() => {
    return userBBTprovided > 0 ? (bbtProfit / userBBTprovided) * 100 : 0;
  }, [bbtProfit, userBBTprovided]);

  return {
    userWithdrawablePOL,
    userWithdrawableToken,
    userLPAmount,
    userLiquidityShare,
    polYieldPercent,
    bbtYieldPercent,
  };
};
