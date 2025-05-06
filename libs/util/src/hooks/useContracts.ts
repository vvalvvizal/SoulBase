import { useEffect, useState } from 'react';
import {
  SBTRouter,
  SBTRouter__factory,
  LiquidityPool,
  LiquidityPool__factory,
  BaseballTokenRouter,
  BaseballTokenRouter__factory,
  BaseballToken,
  BaseballToken__factory,
} from '../../../../standalone/soulBase-contract/typechain-types';
import {
  SBTRouterAddress,
  LiquidityPoolAddress,
  BaseballTokenRouterAddress,
  BaseballTokenAddress,
} from '../contract';
import { getProvider } from '../getProvider';

export const useContracts = (account: string, isConnected: boolean) => {
  const [isOwner, setIsOwner] = useState(false);
  const [SBTRouterContract, setSBTRouterContract] = useState<SBTRouter | null>(
    null,
  );
  const [LPcontract, setLPcontract] = useState<LiquidityPool | null>(null);
  const [BBTRouterContract, setBBTRouterContract] =
    useState<BaseballTokenRouter | null>(null);
  const [BBTContract, setBBTContract] = useState<BaseballToken | null>(null);

  const fetchContracts = async () => {
    try {
      const provider = await getProvider();
      const signer = await provider.getSigner();

      const sbtRouter = SBTRouter__factory.connect(SBTRouterAddress, signer);
      const lp = LiquidityPool__factory.connect(LiquidityPoolAddress, signer);
      const bbtRouter = BaseballTokenRouter__factory.connect(
        BaseballTokenRouterAddress,
        signer,
      );
      const bbt = BaseballToken__factory.connect(BaseballTokenAddress, signer);

      setSBTRouterContract(sbtRouter);
      setLPcontract(lp);
      setBBTRouterContract(bbtRouter);
      setBBTContract(bbt);

      const owner = await sbtRouter.owner();
      setIsOwner(account.toLowerCase() === owner.toLowerCase());
    } catch (error) {
      console.error('Error fetching contracts:', error);
    }
  };

  useEffect(() => {
    if (isConnected && account) {
      fetchContracts();
    }
  }, [isConnected, account]);

  return {
    isOwner,
    BBTContract,
    SBTRouterContract,
    LPcontract,
    BBTRouterContract,
  };
};
