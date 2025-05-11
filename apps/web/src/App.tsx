import { Header } from '@soulBase/ui/src/components/organisms/Header';
import { Container } from '@soulBase/ui/src/components/atmos/Container';
import { Route, Routes } from 'react-router-dom';
import { TailwindTagCollector } from './TailwindTagCollector';
import SBTbyPlayerpage from './pages/SBTbyPlayerpage';
import SBTItempage from './pages/SBTItempage';
import SBTMintpage from './pages/SBTMintpage';
import SwapPage from './pages/SwapPage';
import PoolStatuspage from './pages/PoolStatuspage';
import Mainpage from './pages/Mainpage';
import SBTListpage from './pages/SBTListpage';
import HandleLiquiditypage from './pages/HandleLiquiditypage';

function App() {
  return (
    <main>
      <Header />
      <TailwindTagCollector />

      <Container>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/sbts" element={<SBTListpage />} />
          <Route path="/user" element={<SBTbyPlayerpage />} />
          <Route path="/sbt/:sbt" element={<SBTItempage />} />
          <Route path="/sbtmint" element={<SBTMintpage />} />
          <Route path="/swap" element={<SwapPage />} />
          <Route path="/pool" element={<PoolStatuspage />} />
          <Route path="/handleLiquidity" element={<HandleLiquiditypage />} />
        </Routes>
      </Container>
    </main>
  );
}

export default App;
