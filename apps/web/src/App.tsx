import './styles/App.css';

import { useAccount } from '@/hooks/ether';

function App() {
  const { account, initializeWeb3Provider, isConnected } = useAccount();
  return (
    <>
      <div>Hello world!</div>
      {!isConnected && (
        <button onClick={initializeWeb3Provider}>Connect to MetaMask</button>
      )}
      {isConnected && (
        <div>
          <p>Connected with account: {account}</p>
        </div>
      )}
    </>
  );
}

export default App;
