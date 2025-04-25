import { useQuery } from '@apollo/client';
import { SbTsByPlayerDocument } from '@soulBase/network/src/gql/generated';
import { useParams } from 'react-router-dom';
export const SBTbyPlayer=()=> {
  const { userId } = useParams();
  const { data } = useQuery(SbTsByPlayerDocument, {
    variables: {
      where: {
        id: userId ? parseInt(userId) : undefined,
      },
    },
    skip: false,
  });

  return (<div> sbts by player {JSON.stringify(data, null, 2)}</div>);
}
