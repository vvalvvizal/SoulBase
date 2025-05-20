import { ArrowUpRight, Clock, Droplets, Info, Repeat } from 'lucide-react';
import { usePoolStatus } from '@soulBase/util/src/hooks/usePoolStatus';
import { usePOLPrice } from '@soulBase/util/src/hooks/useCoingecko';
import { Link } from 'react-router-dom';
import { PoolCompositionChart } from '../organisms/Composition';
import { useUserPoolStatus } from '@soulBase/util/src/hooks/useUserPoolStatus';
import { POL_TOKEN_INFO, BBT_TOKEN_INFO } from '../organisms/TokenInput';
import { useEffect, useState } from 'react';
import Button from '../atmos/Button';
import LiquidityModal from './LPModal';
import { usePoolEvent } from '@soulBase/util/src/hooks/usePoolEvent';
import { useAccount } from '@soulBase/util/src/hooks/useAccount';
import { useTokenBalance } from '@soulBase/util/src/hooks/useTokenBalance';
import { useContracts } from '@soulBase/util/src/hooks/useContracts';
import { shortenAddress } from '@soulBase/util/src/shortenAddress';

export const PoolStatus = () => {
  const [showModal, setShowModal] = useState(false);
  const { account, isConnected, balance, initializeWeb3Provider } =
    useAccount(); //balance string
  const { BBTRouterContract, BBTContract } = useContracts(account, isConnected);
  const tokenBalance = useTokenBalance(BBT_TOKEN_INFO.address); //string
  const {
    TotalLiquidity,
    BBTAmount: bbtAmount,
    POLAmount: polAmount,
    exchangeRate,
  } = usePoolStatus();
  const { userProvided, LPTransaction } = usePoolEvent(account);
  const { userLPAmount, userLiquidityShare, polYieldPercent } =
    useUserPoolStatus(userProvided);
  const { price } = usePOLPrice();

  //2.001401956472791e+22 -> 20,014,019,564,727,910,000,000 toLocaleString()
  //₩20,014,019,564,727,910,000,000

  useEffect(() => {
    initializeWeb3Provider();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-xl p-6 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">BBT-POL 유동성 풀</h2>
          <p className="text-gray-400 mt-1">유동성 풀 상태 및 통계</p>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          {/* 현재 flex 컨테이너 내부 기본 정렬이 raw, 이상태에서 주축(가로)을 중앙으로 */}
          <Button
            size="medium"
            className="mt-4 md:mt-0"
            onClick={() => setShowModal(true)}
          >
            <Droplets className="w-4 h-4 mr-1" />
            유동성 추가/제거
          </Button>
          <Link
            to="/swap"
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
          >
            <Repeat className="w-4 h-4 mr-1" />
            스왑
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-xl p-5">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            풀 구성
            <Info size={16} className="ml-2 text-gray-500" />
          </h3>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-1xl font-bold">{TotalLiquidity} POL</p>
              <p className="text-3xl font-bold">${price}</p>
              <p className="text-gray-400 text-sm">총 유동성</p>
            </div>
            {/*
              <div className="flex items-center text-green-500">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-sm">+2.4%</span>
              </div> */}
          </div>

          <div className="mb-6">
            <PoolCompositionChart bbtAmount={bbtAmount} polAmount={polAmount} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">BBT </span>
                <img src={BBT_TOKEN_INFO.icon} className="h-10 w-10 rounded" />
              </div>
              <p className="text-lg font-medium">
                {bbtAmount?.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 flex">
                <a
                  href={`https://amoy.polygonscan.com/address/${BBT_TOKEN_INFO.address}`}
                >
                  View Contract
                </a>
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-3">
              <div className="flex items-center mb-1 justify-between ">
                <span className="text-sm">POL </span>
                <img src={POL_TOKEN_INFO.icon} className="h-10 w-10 rounded" />
              </div>

              <p className="text-lg font-medium">
                {polAmount?.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 flex">
                <a
                  href={`https://amoy.polygonscan.com/address/${POL_TOKEN_INFO.address}`}
                >
                  View Contract
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-5">
          <h3 className="text-lg font-medium mb-4">풀 통계</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
              <div className="flex items-center">
                {/* <DollarSign size={16} className="mr-2 text-gray-400" /> */}
                <span>24시간 거래량</span>
              </div>
              {/* <span className="font-medium">${volume24h.toLocaleString()}</span> */}
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
              <div className="flex items-center">
                {/* <Percent size={16} className="mr-2 text-gray-400" /> */}
                <span>수익률</span>
              </div>
              <span className="font-medium text-green-500">
                {polYieldPercent.toFixed(2)}%
              </span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-gray-400" />
                <span>24시간 트랜잭션</span>
              </div>
              {/* <span className="font-medium">{transactions24h}</span> */}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {/* <BarChart3 size={16} className="mr-2 text-gray-400" /> */}
                <span>현재 교환 비율</span>
              </div>
              <div className="text-right">
                <div className="font-medium">1 BBT = {exchangeRate} POL</div>
                <div className="text-sm text-gray-400">
                  1 POL = {1 / exchangeRate} BBT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-xl p-5 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">가격 히스토리</h3>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-xs">
                1D
              </button>
              <button className="px-2 py-1 bg-blue-600 rounded-md text-xs">
                1W
              </button>
              <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-xs">
                1M
              </button>
              <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-xs">
                ALL
              </button>
            </div>
          </div>
          <div className="h-60">{/* <PoolHistoryChart /> */}</div>
        </div>

        <div className="bg-gray-800 rounded-xl p-5">
          <h3 className="text-lg font-medium mb-4">내 유동성</h3>

          {userLPAmount > 0 ? (
            <>
              <div className="mb-4">
                <p className="text-2xl font-bold">
                  {userLPAmount.toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm">LP 보유량</p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">
                    풀 점유율 (유저 보유 LP 수량 / 총 LP 발행량)
                  </span>
                  <span className="text-sm">
                    {userLiquidityShare.toLocaleString()}%
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium">
                유동성 관리
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <p className="text-gray-400 mb-4">
                아직 이 풀에 유동성을 제공하지 않았습니다.
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
              >
                유동성 추가하기
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-5">
        <h3 className="text-lg font-medium mb-4">최근 트랜잭션</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="pb-2">유형</th>
                <th className="pb-2">금액</th>
                <th className="pb-2">계정</th>
                <th className="pb-2">시간</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody className="text-sm text-white ">
              {LPTransaction.map((tx, idx) => {
                const isAdd = tx.type === 'ADD_LIQUIDITY';
                const isRemove = tx.type === 'REMOVE_LIQUIDITY';
                //const isSwap = tx.type === 'SWAP';

                const typeLabel = isAdd
                  ? '유동성 추가'
                  : isRemove
                    ? '유동성 제거'
                    : '스왑';

                const typeColor = isAdd
                  ? 'text-blue-500'
                  : isRemove
                    ? 'text-red-500'
                    : 'text-green-500';

                const amountDisplay = `${tx.tokenAmount} BBT + ${tx.ethAmount} POL`;

                return (
                  <tr key={idx} className="border-t border-gray-700 ">
                    <td className={`py-3 text-center ${typeColor}`}>
                      {typeLabel}
                    </td>
                    <td className="py-3 text-center">{amountDisplay}</td>

                    <td className="py-3 text-center">
                      {shortenAddress(tx.account)}
                    </td>
                    <td className="py-3 text-center">{tx.timestamp}</td>
                    <td className="py-3">
                      <a
                        href={`https://polygonscan.com/tx/${tx.txHash.slice(0, 66)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-400"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center">
          <button className="text-blue-500 hover:text-blue-400 text-sm">
            더 보기
          </button>
        </div>
      </div>
      {showModal && BBTRouterContract && BBTContract && (
        <LiquidityModal
          onClose={() => setShowModal(false)}
          userBbtBalance={tokenBalance} //string
          userPolBalance={balance}
          userLpTokens={userLPAmount}
          BBTRouterContract={BBTRouterContract}
          BBTContract={BBTContract}
        />
      )}
    </div>
  );
};
