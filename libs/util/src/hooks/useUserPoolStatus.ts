import { useEffect, useState, useMemo } from 'react';
import { useAccount } from './useAccount';
import { useContracts } from './useContracts';
import { usePoolStatus } from './usePoolStatus';
import { formatEther } from 'ethers';
import { UserProvided } from '../types';

export const useUserPoolStatus = (userProvided: UserProvided) => {
  const [userLPAmount, setUserLPAmount] = useState<number>(0);
  const [userLiquidityShare, setUserLiquidityShare] = useState<number>(0);

  const { rawBbtSum: userBBTprovided, rawPolSum: userPOLprovided } =
    userProvided;
  const { account, isConnected, initializeWeb3Provider } = useAccount();
  const { LPcontract } = useContracts(account, isConnected);
  const { totalLPSupply, POLAmount, BBTAmount, fetchPoolStatus } =
    usePoolStatus();

  useEffect(() => {
    initializeWeb3Provider();
    fetchPoolStatus();
  }, [account, LPcontract]);

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!account || !LPcontract || !totalLPSupply) return;
      try {
        const userLP: bigint = await LPcontract.balanceOf(account);
        const userLPnum = Number(formatEther(userLP));
        setUserLPAmount(userLPnum);
        setUserLiquidityShare(
          totalLPSupply > 0 ? (userLPnum / totalLPSupply) * 100 : 0,
        );
      } catch (error) {
        console.error('Error fetching user LP status:', error);
      }
    };

    fetchUserStatus();
  }, [account, LPcontract, totalLPSupply]);

  // 파생값은 useMemo로 관리
  const formattedUserBBTProvided = useMemo(
    () => Number(formatEther(userBBTprovided)),
    [userBBTprovided],
  );

  const formattedUserPOLProvided = useMemo(
    () => Number(formatEther(userPOLprovided)),
    [userPOLprovided],
  );

  //user가 실제 인출 가능한 POL
  const userWithdrawablePOL = useMemo(() => {
    if (!totalLPSupply) return 0;
    return (POLAmount * userLPAmount) / totalLPSupply; //user가 실제 인출 가능한 POL, 풀의 pol 수량에서 내 지분만큼
  }, [POLAmount, userLPAmount, totalLPSupply]);

  const userWithdrawableToken = useMemo(() => {
    if (!totalLPSupply) return 0;
    return (BBTAmount * userLPAmount) / totalLPSupply;
  }, [BBTAmount, userLPAmount, totalLPSupply]);

  //수익
  const polProfit = useMemo(
    () => userWithdrawablePOL - formattedUserPOLProvided,
    [userWithdrawablePOL, formattedUserPOLProvided],
  );

  const bbtProfit = useMemo(
    () => userWithdrawableToken - formattedUserBBTProvided,
    [userWithdrawableToken, formattedUserBBTProvided],
  );

  const polYieldPercent = useMemo(() => {
    return formattedUserPOLProvided > 0
      ? (polProfit / formattedUserPOLProvided) * 100
      : 0;
  }, [polProfit, formattedUserPOLProvided]);

  const bbtYieldPercent = useMemo(() => {
    return formattedUserBBTProvided > 0
      ? (bbtProfit / formattedUserBBTProvided) * 100
      : 0;
  }, [bbtProfit, formattedUserBBTProvided]);

  return {
    userWithdrawablePOL,
    userWithdrawableToken,
    userLPAmount,
    userLiquidityShare,
    polProfit,
    bbtProfit,
    polYieldPercent,
    bbtYieldPercent,
  };
};
