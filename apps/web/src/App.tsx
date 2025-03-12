import './styles/App.css';

import { useAccount } from '@/hooks/ether';
import { useQuery } from '@apollo/client';
import { SbTsDocument } from '@soulBase/network/src/gql/generated';

function App() {
  const { account, initializeWeb3Provider, isConnected, balance, isOwner } =
    useAccount();
  const { data } = useQuery(SbTsDocument);

  return (
    <>
      {!isConnected && (
        <button onClick={initializeWeb3Provider}>Connect to MetaMask</button>
      )}
      {isConnected && (
        <main>
          <div>Connected with account: {account}</div>
          <div>Balance : {balance} </div>
          <div>isOwner : {String(isOwner)} </div>

          <div className="mt-12">
            {data?.SBTs.map((sbt) => (
              <div key={sbt.id}>
                <div>{sbt.tokenId}</div>
                <div>{sbt.name}</div>
              </div>
            ))}
          </div>
        </main>
      )}
    </>
  );
}

export default App;
