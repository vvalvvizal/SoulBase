import { useContracts } from './useContracts'; // ✅ 올바른 훅 import
import { useAccount } from './useAccount';
import { useEffect, useState } from 'react';
import { BigNumberish } from 'ethers';



export const usePoolStatus = () => {

  const {isConnected, initializeWeb3Provider, account} = useAccount();
  const { LPcontract } = useContracts(account, isConnected); 
  const [TotalLiquidity, setTotalLiquidity] = useState();
  const [BBTAmount, setBBTAmount] = useState<number>(); //컨트랙트의 bigNumber를 타입스크립트 number로 변환
  const [POLAmount, setPOLAmount] = useState<number>()
 
  useEffect(() => {
    initializeWeb3Provider();
    if (LPcontract) {
      fetchPoolStatus();
    }
  }, [account, LPcontract]); 

  const fetchPoolStatus = async () => {
    try {
      if (LPcontract) {
        const owner = await LPcontract.owner();
        console.log('Owner:', owner);

        const bbtAmount:BigNumberish = await LPcontract.tokenReserve();
        setBBTAmount(Number(bbtAmount));
        
      }
    } catch (error) {
      console.error('Error fetching LiquidityPool status:', error);
    }
  };
  

  return {
    TotalLiquidity, BBTAmount, POLAmount
  }
};
