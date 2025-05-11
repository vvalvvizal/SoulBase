import {
  ArrowRight,
  Award,
  BarChart2,
  ChevronRight,
  Coins,
  CurrencyIcon as Exchange,
  ExternalLink,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import Button from '@soulBase/ui/src/components/atmos/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Card } from '@soulBase/ui/src/components/organisms/Card';

export default function Mainpage() {
  const navigate = useNavigate();

  function handleSbtClick(sbtId: number) {
    navigate(`/sbt/${sbtId}`);
    return;
  }

  const stats = [
    { label: '발행된 SBT', value: '1,245', icon: Trophy },
    { label: 'BBT 홀더', value: '8,392', icon: Users },
    { label: '총 유동성', value: '$2.4M', icon: Coins },
    { label: '24시간 거래량', value: '$345K', icon: Exchange },
  ];

  const demoSBT = [
    {
      id: 1,
      tokenId: 1,
      image_url: null,
      name: 'test',
      description: 'test sbt',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50 z-0"></div>
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              야구 선수 업적을 <span className="text-blue-400">응원</span>하고
              <span className="text-blue-400"> 거래</span>하세요
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              SoulBase에서 야구 선수 업적 SBT를 응원하고 BBT 토큰으로
              보상받으세요. 유동성 풀에 참여하여 수익을 창출하세요.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="small" className="bg-blue-600 hover:bg-blue-700">
                SBT 수집하기
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="small"
                className="border-blue-500 text-blue-400 hover:bg-blue-950"
              >
                유동성 풀 참여하기
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-blue-600 p-3 rounded-lg mr-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SBT 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              야구 선수 업적 SBT
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              선수들의 특별한 업적을 기념하는 소울바운드 토큰(SBT)을 수집하고
              소유하세요. 각 SBT는 고유하며 양도할 수 없습니다.
            </p>
          </div>

          <div defaultValue="all" className="mb-12">
            {/* <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-800">
                <TabsTrigger value="all" onClick={() => setActiveTab("all")}>전체</TabsTrigger>
                <TabsTrigger value="hitters" onClick={() => setActiveTab("hitters")}>타자</TabsTrigger>
                <TabsTrigger value="pitchers" onClick={() => setActiveTab("pitchers")}>투수</TabsTrigger>
                <TabsTrigger value="special" onClick={() => setActiveTab("special")}>특별 업적</TabsTrigger>
              </TabsList>
            </div> */}

            {/* <div value="all" className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {demoSBT.map((sbt) => (
                <Card key={sbt.id} sbt={sbt} onClick={handleSbtClick} />
              ))}
            </div>

            {/* <div value="hitters"> */}
            <div>
              <div className="text-center py-12">
                <p className="text-gray-400">
                  타자 업적 SBT를 보려면 로그인하세요
                </p>
              </div>
            </div>

            {/* <div value="pitchers"> */}
            <div>
              <div className="text-center py-12">
                <p className="text-gray-400">
                  투수 업적 SBT를 보려면 로그인하세요
                </p>
              </div>
            </div>

            {/* <div value="special"> */}
            <div>
              <div className="text-center py-12">
                <p className="text-gray-400">
                  특별 업적 SBT를 보려면 로그인하세요
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button className="border-blue-500 text-blue-400 hover:bg-blue-950">
              <Link to="/user">
                모든 SBT 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* BBT 토큰 섹션 */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-blue-600 inline-block p-4 rounded-2xl mb-6">
                <Coins className="h-12 w-12" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">BBT 토큰</h2>
              <p className="text-xl text-gray-300 mb-6">
                BBT 토큰은 SoulBase 생태계의 핵심 화폐입니다. SBT 수집,
                스테이킹, 거버넌스 참여 등 다양한 활동에 사용됩니다.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-900 p-2 rounded-lg mr-4 mt-1">
                    <Star className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">SBT 수집 보상</h3>
                    <p className="text-gray-400">
                      SBT를 수집하면 BBT 토큰으로 보상받을 수 있습니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-900 p-2 rounded-lg mr-4 mt-1">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">스테이킹 수익</h3>
                    <p className="text-gray-400">
                      BBT 토큰을 스테이킹하여 추가 수익을 창출하세요.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-900 p-2 rounded-lg mr-4 mt-1">
                    <Users className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">거버넌스 참여</h3>
                    <p className="text-gray-400">
                      BBT 토큰 보유자는 플랫폼의 중요한 결정에 투표할 수
                      있습니다.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Link to="/swap">
                  BBT 토큰 구매하기
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium">BBT 토큰 정보</h3>
                <div className="bg-green-600/20 text-green-500 px-3 py-1 rounded-full text-sm">
                  +5.2% 24h
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">현재 가격</span>
                  <span className="font-medium">$0.0345</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">시가총액</span>
                  <span className="font-medium">$3,450,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">유통량</span>
                  <span className="font-medium">100,000,000 BBT</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">총 발행량</span>
                  <span className="font-medium">1,000,000,000 BBT</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">컨트랙트 주소</span>
                  <span className="font-medium text-blue-400">
                    0x1a2b...3c4d
                  </span>
                </div>
              </div>
              <div className="h-40 bg-gray-700 rounded-lg flex items-center justify-center">
                <BarChart2 className="h-12 w-12 text-gray-500" />
                <span className="ml-2 text-gray-500">가격 차트</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 유동성 풀 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              BBT-POL 유동성 풀
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              BBT와 POL 토큰을 교환하고 유동성 풀에 참여하여 수수료 수익을
              얻으세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <div className="bg-blue-900 inline-block p-3 rounded-lg mb-4">
                  <Exchange className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">토큰 스왑</h3>
                <p className="text-gray-400 mb-6">
                  BBT와 POL 토큰을 쉽고 빠르게 교환하세요. 낮은 수수료와
                  슬리피지로 최적의 거래를 제공합니다.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  토큰 스왑하기
                </Button>
              </div>
            </div>

            <div className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <div className="bg-blue-900 inline-block p-3 rounded-lg mb-4">
                  <Coins className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">유동성 제공</h3>
                <p className="text-gray-400 mb-6">
                  BBT와 POL 토큰을 유동성 풀에 제공하고 거래 수수료의 일부를
                  수익으로 받으세요.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  유동성 추가하기
                </Button>
              </div>
            </div>

            <div className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <div className="bg-blue-900 inline-block p-3 rounded-lg mb-4">
                  <Award className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">수익 확인</h3>
                <p className="text-gray-400 mb-6">
                  유동성 풀 참여로 얻은 수익을 확인하고 보상을 청구하세요.
                  실시간으로 수익을 추적할 수 있습니다.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  수익 확인하기
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button className="border-blue-500 text-blue-400 hover:bg-blue-950">
              유동성 풀 상세 정보
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            SoulBase에 참여하세요
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            야구 선수 업적 SBT를 수집하고, BBT 토큰으로 보상받고, 유동성 풀에
            참여하여 수익을 창출하세요.
          </p>
          <Button
            size="small"
            className="bg-white text-blue-900 hover:bg-gray-200"
          >
            지금 시작하기
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
