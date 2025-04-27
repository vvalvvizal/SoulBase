import { useQuery } from '@apollo/client';
import { SbTsByPlayerDocument } from '@soulBase/network/src/gql/generated';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../organisms/Card';

export const SBTbyPlayer = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(SbTsByPlayerDocument, {
    variables: {
      where: {
        id: userId ? parseInt(userId) : undefined,
      },
    },
    skip: false,
  });

  function handleSbtClick(sbtId: number) {
    navigate(`/sbt/${sbtId}`);
    return;
  }

  const { user } = data || {};
  const { Player } = user || {};
  const { sbts } = Player || {};

  function setSearchTerm(value: string): void {
    throw new Error('Function not implemented.');
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
