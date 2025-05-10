import { useEffect, useState } from 'react';
import Button from '../atmos/Button';
import { IconServer, IconSettings } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import {
  BBT_TOKEN_INFO,
  POL_TOKEN_INFO,
  TokenInput,
} from '../organisms/TokenInput';
import { ArrowDown, RefreshCw } from 'lucide-react';
import { FormError } from '../atmos/FormError';
import { useTokenBalance } from '@soulBase/util/src/hooks/useTokenBalance';
import { swap } from '../../../utils/actions/swap';
import { useContracts } from '@soulBase/util/src/hooks/useContracts';
import { useAccount } from '@soulBase/util/src/hooks/useAccount';
import Badge from '../atmos/Badge';
import { usePoolStatus } from '@soulBase/util/src/hooks/usePoolStatus';

export const Swap = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [slippage, setSlippage] = useState('0.5');
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [slippageError, setSlippageError] = useState(null);
  const { account, initializeWeb3Provider, isConnected } = useAccount();
  const [minimumReceived, setMinimumReceived] = useState<number|String>('');
  const { BBTRouterContract, BBTContract } = useContracts(account, isConnected);
  const { exchangeRate } = usePoolStatus();//   x * y = k, y = k/x 처럼 pol = pol*bbt/bbt 계산 

  useEffect(() => {
    initializeWeb3Provider();
  }, [account]);

  useEffect(()=>{
    const calMinimumReceive = (outputAmount) => {
      const outputAmountFloat = parseFloat(outputAmount);
      const minReceive = outputAmountFloat - (outputAmountFloat * (parseFloat(slippage) / 100));
      setMinimumReceived(minReceive);
    }
    calMinimumReceive(outputAmount);
  },[slippage, outputAmount])
  
  const handleInputChange = (value: string) => {
    setInputAmount(value);

    if (value && !isNaN(Number(value))) {
      const output = isReversed //isReversed true일때 output은 pol 
        ? (parseFloat(value) * exchangeRate).toFixed(6)
        : (parseFloat(value) / exchangeRate).toFixed(6);

      setOutputAmount(output);

    } else {
      setOutputAmount('');
      setMinimumReceived('');
    }
  };

  const handleOutputChange = (value: string) => {
    setOutputAmount(value);
    if (value && !isNaN(Number(value))) {
      //isReversed가 true면 bbt -> pol이라는거 

      const input = isReversed //isReversed true일 때 input은 bbt
        ? (parseFloat(value) / exchangeRate).toFixed(6)
        : (parseFloat(value) * exchangeRate).toFixed(6);
      setInputAmount(input);
    } else {
      setInputAmount('');
      setMinimumReceived('');
    }
  };

  const handleReverseTokens = () => {
    setIsReversed(!isReversed);
    setInputAmount('');
    setOutputAmount('');
    setMinimumReceived('');
  };

  const BBTbalance = useTokenBalance(BBT_TOKEN_INFO.address);
  const POLbalance = useTokenBalance(POL_TOKEN_INFO.address);

  const inputToken = isReversed ? BBT_TOKEN_INFO : POL_TOKEN_INFO;
  const outputToken = isReversed ? POL_TOKEN_INFO : BBT_TOKEN_INFO;
  const inputBalance = isReversed ? BBTbalance : POLbalance;
  const outputBalance = isReversed ? POLbalance : BBTbalance;
  const ETHvalue = isReversed ? undefined : inputAmount;

  const checkSlippage = (value: string) => {
    const num = parseFloat(value);
    if (num >= 100) {
      setSlippageError('슬리피지 허용 범위는 0% ~ 100%입니다.');
      return false;
    }
    setSlippage(value);
    setSlippageError(null);
    return true;
  };

  const handleSwap = async () => {
    console.log(isReversed, inputToken, outputToken);
    const success = await swap({
      BBTRouterContract,
      BBTContract,
      payload: {
        tokenAmount: inputAmount,
        ethAmount: ETHvalue,
        minAmountOut: minimumReceived,
      },
    });

    if (success) {
      setInputAmount('');
      setOutputAmount('');
    }
    console.log('Swap success:', success);
  };

  const handleMaxClick = () => {
    handleInputChange(inputBalance);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">SWAP</h1>
        <p className="text-gray-600 text-center mb-6">
          BBT와 POL을 DEX에서 Swap하세요 <br />
        </p>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-md mx-auto bg-gray-900 rounded-2xl shadow-xl p-4 text-white">
          <div className="flex justify-between items-center mb-4">
            <Link to="/pool" aria-label="liquidityPool" className="w-auto z-50">
              <Badge variant="gray" size="md" className="">
                풀 상태 보기
              </Badge>
            </Link>
            <h2 className="text-xl font-bold">토큰 스왑</h2>
            <Button
              onClick={() => setShowSettings(!showSettings)}
              intent="primary"
              size="small"
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <IconSettings />
            </Button>
          </div>

          {showSettings && (
            <div className="mb-4 p-3 bg-gray-800 rounded-xl">
              <h3 className="text-sm font-medium mb-2">슬리피지 허용 범위</h3>
              <div className="flex gap-2">
                {['0.1', '0.2', '0.5', '1.0'].map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      setSlippage(value);
                      setShowSettings(!showSettings);
                    }}
                    className={`max-h-11 px-2 py-1 rounded-lg text-sm ${
                      slippage === value
                        ? 'bg-blue-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {value}%
                  </button>
                ))}

                <div className="relative flex-1 pr-2">
                  <input
                    type="text"
                    value={slippage}
                    onChange={(e) => checkSlippage(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg pl-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute text-sm">%</span>
                  <FormError error={slippageError} variant="white" size="sm" />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <TokenInput
              label="From"
              value={inputAmount}
              onChange={handleInputChange}
              token={inputToken}
              balance={inputBalance}
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleMaxClick}
                className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
              >
                최대
              </button>
            </div>

            <div className="relative h-8 flex justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <button
                onClick={handleReverseTokens}
                className="relative z-5 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <ArrowDown size={20} />
              </button>
            </div>

            <TokenInput
              label="To"
              value={outputAmount}
              onChange={handleOutputChange}
              token={outputToken}
              balance={outputBalance}
            />
          </div>

          <div className="mt-4 p-3 bg-gray-800 rounded-xl text-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 flex items-center">
                <span>가격</span>
              </span>
              <span>
                1 {inputToken.symbol} ={' '}
                {isReversed ? (1 / exchangeRate).toFixed(6) : exchangeRate}{' '}
                {outputToken.symbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">최소 수령량</span>
              <span>{minimumReceived} {outputToken.symbol} </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">최대 슬리피지</span>
              <span>{slippage}%</span>
            </div>
          </div>

          <button
            onClick={handleSwap}
            disabled={!inputAmount || Number.parseFloat(inputAmount) === 0}
            className={`w-full mt-4 py-4 rounded-xl font-bold text-lg ${
              !inputAmount || Number.parseFloat(inputAmount) === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 transition-colors'
            }`}
          >
            {!inputAmount ? '금액을 입력하세요' : '스왑'}
          </button>

          <div className="mt-4 flex justify-center">
            <button
              className="flex items-center text-sm text-gray-400 hover:text-gray-300"
              onClick={() => {
                //가격 새로고침
              }}
            >
              <RefreshCw size={14} className="mr-1" />
              가격 새로고침
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
