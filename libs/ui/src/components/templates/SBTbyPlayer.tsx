import { useQuery } from '@apollo/client';
import {
  UserByAddressDocument,
  SbTsByPlayerDocument,
} from '@soulBase/network/src/gql/generated';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../organisms/Card';
import { useAccount } from '@soulBase/util/src/hooks/useAccount';
import { useEffect } from 'react';

export const SBTbyPlayer = () => {
  const { account, initializeWeb3Provider } = useAccount();

  const navigate = useNavigate();

  useEffect(() => {
    initializeWeb3Provider();
  }, [account]);

  const { data: userData, error: userError } = useQuery(UserByAddressDocument, {
    variables: {
      where: {
        address: account?.toLowerCase(), //소문자로
      },
    },
    skip: !account,
  });

  const user = userData?.user;
  const userId = user?.id;
  const isPlayer = user?.isPlayer ?? false;

  const { data: sbtData, error: sbtError } = useQuery(SbTsByPlayerDocument, {
    variables: {
      where: {
        id: userId,
      },
    },
    skip: !userId || !isPlayer, //일반 유저일경우 skip
  });

  const sbts = sbtData?.user?.Player?.sbts ?? [];

  function handleSbtClick(sbtId: number) {
    navigate(`/sbt/${sbtId}`);
    return;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">SBT 컬렉션 앨범</h1>
        <p className="text-gray-600 text-center mb-6">
          모든 야구선수 업적 SBT를 한눈에 확인하세요
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {sbts?.length > 0 ? (
          sbts.map((sbt) => (
            <Card key={sbt.id} sbt={sbt} onClick={handleSbtClick} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">검색 결과가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};
