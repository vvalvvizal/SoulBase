import './styles/App.css';

import { useAccount } from '@/hooks/ether';

function App() {
  const { account, initializeWeb3Provider, isConnected, balance, isOwner } =
    useAccount();
  console.log(import.meta.env.VITE_INFURA_KEY);
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
        </main>
      )}
    </>
  );
}

export default App;
