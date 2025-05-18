import { useState } from 'react';
import { AlertCircle, ArrowDown, Info, Loader2 } from 'lucide-react';
import Button from '../atmos/Button';
import { usePoolStatus } from '@soulBase/util/src/hooks/usePoolStatus';
import { addLiquidity } from '../../../utils/actions/addLiquidity';
import { pullLiquidity } from '../../../utils/actions/pullLiquidity';

export default function LiquidityModal({
  onClose,
  userBbtBalance: userBBTBalance,
  userPolBalance: userPOLBalance,
  userLpTokens: userLPTokens,
  BBTRouterContract,
  BBTContract,
}) {
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
    if (BBTValue > userBBTBalance) throw new Error('BBT 잔액이 부족합니다');
    if (POLValue > userPOLBalance) throw new Error('POL 잔액이 부족합니다');

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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">유동성 관리</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-4">
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
        </div>
      </div>
    </div>
  );
}
