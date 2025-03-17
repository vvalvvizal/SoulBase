import './styles/App.css';
import '@soulBase/ui/src/index.css';
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
          <div className="w-8 h-8 bg-primary rounded"></div>
        </main>
      )}
    </>
  );
}

export default App;
