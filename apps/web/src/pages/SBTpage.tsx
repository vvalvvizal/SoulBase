import {useQuery} from '@apollo/client';
import {SbtsDocument} from '@soulBase/network/src/gql/generated';


export default function SBTpage() {
    const {data} = useQuery(SbtsDocument);

return (<div> sbts {JSON.stringify(data,null,2)}</div>)
    
}