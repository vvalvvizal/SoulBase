import { ArrowUpRight, Droplets, Repeat } from 'lucide-react';
import { usePoolStatus } from '@soulBase/util/src/hooks/usePoolStatus';
import { usePOLPrice } from '@soulBase/util/src/hooks/useCoingecko';
import { Link } from 'react-router-dom';
import { PoolCompositionChart } from '../organisms/Composition';
import { useContracts } from '@soulBase/util/src/hooks/useContracts';
import { useQuery, gql } from '@apollo/client';
import { graphClient } from '@soulBase/network/src/config/graphClient';
import { POL_TOKEN_INFO, BBT_TOKEN_INFO } from '../organisms/TokenInput';

export const PoolStatus = () => {
  const {
    TotalLiquidity,
    BBTAmount: bbtAmount,
    POLAmount: polAmount,
    exchangeRate,
  } = usePoolStatus();

  const { price } = usePOLPrice();
  // //the graph subgraph에 쿼리
  const GET_24H_VOLUME = gql`
    query Get24hVolume($since: BigInt!) {
      tradedTokens(where: { blockTimestamp_gt: $since }) {
        id
        _ethTraded
        tokenTraded
      }
    }
  `;
  const timestamp24hAgo = Math.floor(Date.now() / 1000) - 86400;
  //현재 시간 기준 24시간 전의 타임스탬프
  const { data, loading, error } = useQuery(GET_24H_VOLUME, {
    client: graphClient, // <-- 요게 핵심
    variables: { since: timestamp24hAgo },
  });
  console.log(data, error);

  //x*y=k
  //1bbt = pol/bbt

  console.log(
    TotalLiquidity,
    bbtAmount.toLocaleString(),
    polAmount.toLocaleString(),
    exchangeRate,
  );

  //2.001401956472791e+22 -> 20,014,019,564,727,910,000,000 toLocaleString()
  //₩20,014,019,564,727,910,000,000

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-xl p-6 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">BBT-POL 유동성 풀</h2>
          <p className="text-gray-400 mt-1">유동성 풀 상태 및 통계</p>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          {/* 현재 flex 컨테이너 내부 기본 정렬이 raw, 이상태에서 주축(가로)을 중앙으로 */}
          <Link
            to="/HandleLiquidity"
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
          >
            <Droplets className="w-4 h-4 mr-1" />
            유동성 추가 및 제거
          </Link>
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
            {/* <Info size={16} className="ml-2 text-gray-500" /> */}
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
                  {' '}
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
                  {' '}
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
                {/* <DollarSign size={16} className="mr-2 text-gray-400" /> */}
                <span>24시간 수수료</span>
              </div>
              {/* <span className="font-medium">${fees24h.toLocaleString()}</span> */}
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
              <div className="flex items-center">
                {/* <Percent size={16} className="mr-2 text-gray-400" /> */}
                <span>연간 수익률 (APR)</span>
              </div>
              {/* <span className="font-medium text-green-500">{apr}%</span> */}
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
              <div className="flex items-center">
                {/* <Clock size={16} className="mr-2 text-gray-400" /> */}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

          {/* {myLiquidity > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-2xl font-bold">${myLiquidity.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">총 유동성 제공량</p>
                </div>
  
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">풀 점유율</span>
                    <span className="text-sm">{myShare}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${myShare}%` }}></div>
                  </div>
                </div>
  
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">예상 일일 수익</span>
                    <span className="font-medium">${(fees24h * (myShare / 100)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">예상 월간 수익</span>
                    <span className="font-medium">${(fees24h * 30 * (myShare / 100)).toFixed(2)}</span>
                  </div>
                </div>
  
                <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium">
                  유동성 관리
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <p className="text-gray-400 mb-4">아직 이 풀에 유동성을 제공하지 않았습니다.</p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium">
                  유동성 추가하기
                </button>
              </div>
            )} */}
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
                <th className="pb-2">금액 (USD)</th>
                <th className="pb-2">계정</th>
                <th className="pb-2">시간</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t border-gray-700">
                <td className="py-3 text-green-500">스왑</td>
                <td className="py-3">234.5 BBT → 8.1 POL</td>
                <td className="py-3">$9.87</td>
                <td className="py-3">0x1a2b...3c4d</td>
                <td className="py-3">3분 전</td>
                <td className="py-3">
                  <a href="#" className="text-blue-500 hover:text-blue-400">
                    <ArrowUpRight size={16} />
                  </a>
                </td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="py-3 text-blue-500">유동성 추가</td>
                <td className="py-3">1,000 BBT + 34.5 POL</td>
                <td className="py-3">$76.54</td>
                <td className="py-3">0x5e6f...7g8h</td>
                <td className="py-3">12분 전</td>
                <td className="py-3">
                  <a href="#" className="text-blue-500 hover:text-blue-400">
                    <ArrowUpRight size={16} />
                  </a>
                </td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="py-3 text-red-500">유동성 제거</td>
                <td className="py-3">500 BBT + 17.2 POL</td>
                <td className="py-3">$38.27</td>
                <td className="py-3">0x9i0j...1k2l</td>
                <td className="py-3">27분 전</td>
                <td className="py-3">
                  <a href="#" className="text-blue-500 hover:text-blue-400">
                    <ArrowUpRight size={16} />
                  </a>
                </td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="py-3 text-green-500">스왑</td>
                <td className="py-3">12.3 POL → 356.7 BBT</td>
                <td className="py-3">$15.13</td>
                <td className="py-3">0x3m4n...5o6p</td>
                <td className="py-3">42분 전</td>
                <td className="py-3">
                  <a href="#" className="text-blue-500 hover:text-blue-400">
                    <ArrowUpRight size={16} />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center">
          <button className="text-blue-500 hover:text-blue-400 text-sm">
            더 보기
          </button>
        </div>
      </div>
    </div>
  );
};
