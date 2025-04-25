import { useQuery } from '@apollo/client';
import { SbtDocument } from '@soulBase/network/src/gql/generated';
import { useParams } from 'react-router-dom';

export const SBTItem=() => {
  const { sbt } = useParams();
  const { data } = useQuery(SbtDocument, {
    variables: {
      where: {
        id: sbt ? parseInt(sbt) : undefined,
      },
    },
    skip: !sbt,
  });
  return (<div> sbt {JSON.stringify(data, null, 2)}</div>);
}
