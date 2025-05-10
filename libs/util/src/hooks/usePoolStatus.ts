import { useContracts } from './useContracts'; // ✅ 올바른 훅 import
import { useAccount } from './useAccount';
import { useEffect, useState } from 'react';
import { BigNumberish, formatEther } from 'ethers';

export const usePoolStatus = () => {
  const { isConnected, initializeWeb3Provider, account } = useAccount();
  const { LPcontract } = useContracts(account, isConnected);
  const [TotalLiquidity, setTotalLiquidity] = useState(0);
  const [BBTAmount, setBBTAmount] = useState<number>(0); //컨트랙트의 bigNumber를 타입스크립트 number로 변환
  const [POLAmount, setPOLAmount] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0);


  useEffect(() => {
    const init = async () => { //초기화 함수
      initializeWeb3Provider();

      if (LPcontract) {
        try {
          const bbt = await LPcontract.tokenReserve();
          const pol = await LPcontract.ethReserve();

          const bbtNum = Number(formatEther(bbt));
          const polNum = Number(formatEther(pol));

          setBBTAmount(bbtNum);
          setPOLAmount(polNum);
          setExchangeRate(polNum / bbtNum);
          setTotalLiquidity(polNum);
        } catch (err) {
          console.error('Error initializing pool status:', err);
        }
      }
    };

    init();
  }, [account, LPcontract]);


  const fetchPoolStatus = async () => {
    try {
      if (LPcontract) {
        const owner = await LPcontract.owner();
        console.log('Owner:', owner);

        const bbtAmount: BigNumberish = await LPcontract.tokenReserve();
        setBBTAmount(Number(formatEther(bbtAmount)));

        const polAmount : BigNumberish = await LPcontract.ethReserve();
        setPOLAmount(Number(formatEther(polAmount)));

        const totalLiquidity : BigNumberish = polAmount

      }
    } catch (error) {
      console.error('Error fetching LiquidityPool status:', error);
    }
  };

  return {
    TotalLiquidity,
    BBTAmount,
    POLAmount,
    exchangeRate
  };
};
