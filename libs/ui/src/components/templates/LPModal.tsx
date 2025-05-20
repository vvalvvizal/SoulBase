import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import Button from '../atmos/Button';
import { usePoolStatus } from '@soulBase/util/src/hooks/usePoolStatus';
import { addLiquidity } from '../../../utils/actions/addLiquidity';
import { pullLiquidity } from '../../../utils/actions/pullLiquidity';
import Modal from '../molecules/Modal';
import {
  BaseballToken,
  BaseballTokenRouter,
} from '../../../../../standalone/soulBase-contract/typechain-types';
interface ILiquidityModalProps {
  onClose: () => void;
  userBbtBalance: string;
  userPolBalance: string;
  userLpTokens: number;
  BBTRouterContract: BaseballTokenRouter;
  BBTContract: BaseballToken;
}
export default function LiquidityModal({
  onClose,
  userBbtBalance: userBBTBalance,
  userPolBalance: userPOLBalance,
  userLpTokens: userLPTokens,
  BBTRouterContract,
  BBTContract,
}: ILiquidityModalProps) {
  if (!BBTRouterContract || !BBTContract) return false;
  const [BBTAmount, setBBTAmount] = useState('');
  const [POLAmount, setPOLAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { exchangeRate } = usePoolStatus();

  //BBT 입력 계산
  const handleBBTChange = (value: string) => {
    setBBTAmount(value);
    if (value && !isNaN(Number.parseFloat(value)) && exchangeRate > 0) {
      const calculatedPol = Number.parseFloat(value) * exchangeRate; //exchange는 1 BBT당 몇 Pol = POL/BBT
      setPOLAmount(calculatedPol.toFixed(6));
    } else {
      setPOLAmount('');
    }
  };

  const handlePOLChange = (value: string) => {
    setPOLAmount(value);
    if (value && !isNaN(Number.parseFloat(value)) && exchangeRate > 0) {
      const calculatedBBT = Number.parseFloat(value) / exchangeRate;
      setBBTAmount(calculatedBBT.toFixed(6));
    } else {
      setBBTAmount('');
    }
  };

  const handleAddLiquidity = async () => {
    setLoading(true);

    if (!BBTAmount || !POLAmount) throw new Error('금액을 입력해주세요');

    const BBTValue = Number.parseFloat(BBTAmount);
    const POLValue = Number.parseFloat(POLAmount);

    if (isNaN(BBTValue) || isNaN(POLValue))
      throw new Error('유효한 숫자를 입력해주세요');
    if (BBTValue <= 0 || POLValue <= 0)
      throw new Error('0보다 큰 금액을 입력해주세요');
    if (BBTValue > Number.parseFloat(userBBTBalance))
      throw new Error('BBT 잔액이 부족합니다');
    if (POLValue > Number.parseFloat(userPOLBalance))
      throw new Error('POL 잔액이 부족합니다');

    //transaction action
    try {
      const success = await addLiquidity({
        BBTRouterContract,
        BBTContract,
        payload: {
          tokenAmount: BBTValue,
          ethAmount: POLValue,
        },
      });

      console.log('Add Liquidity success:', success);
      if (success) {
        setBBTAmount('');
        setPOLAmount('');
      }
    } catch (error) {
      console.error('Add Liquidity failed with error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLiquidity = async () => {
    try {
      setLoading(true);

      if (userLPTokens <= 0) throw new Error('제거할 유동성이 없습니다');

      //transaction
      const success = await pullLiquidity({
        BBTRouterContract,
        payload: '',
      });

      console.log('Remove Liquidity success:', success);
      if (success) {
        setBBTAmount('');
        setPOLAmount('');
      }
    } catch (error) {
      console.error('Remove Liquidity failed with error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="유동성 관리" onClose={onClose}>
      <div>
        <label className="block text-sm text-gray-400 mb-1">
          BBT 수량 (잔액: {userBBTBalance.toLocaleString()} BBT)
        </label>
        <div className="flex">
          <input
            type="text"
            value={BBTAmount}
            onChange={(e) => handleBBTChange(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            placeholder="0.0"
          />
          <button
            className="ml-2 text-sm text-blue-500"
            onClick={() => handleBBTChange(userBBTBalance.toString())}
          >
            최대
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="text-gray-400" size={20} />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          POL 수량 (잔액: {userPOLBalance.toLocaleString()} POL)
        </label>
        <div className="flex">
          <input
            type="text"
            value={POLAmount}
            onChange={(e) => handlePOLChange(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            placeholder="0.0"
          />
          <button
            className="ml-2 text-sm text-blue-500"
            onClick={() => handlePOLChange(userPOLBalance.toString())}
          >
            최대
          </button>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleAddLiquidity}
        intent="primary"
        size="medium"
        disabled={loading || !BBTAmount || !POLAmount}
        loading={loading}
      >
        {loading ? (
          <>
            <br />
          </>
        ) : (
          '유동성 추가하기'
        )}
      </Button>

      <Button
        className="w-full"
        onClick={handleRemoveLiquidity}
        disabled={loading || userLPTokens <= 0}
      >
        {loading ? (
          <>
            <br />
          </>
        ) : (
          '유동성 제거하기'
        )}
      </Button>
    </Modal>
  );
}
