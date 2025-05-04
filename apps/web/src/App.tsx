import { Header } from '@soulBase/ui/src/components/organisms/Header';
import { Container } from '@soulBase/ui/src/components/atmos/Container';
import { Route, Routes } from 'react-router-dom';
import { TailwindTagCollector } from './TailwindTagCollector';
import SBTbyPlayerpage from './pages/SBTbyPlayerpage';
import SBTItempage from './pages/SBTItempage';
import SBTMintpage from './pages/SBTMintpage';
import SwapPage from './pages/SwapPage';

function App() {
  return (
    <main>
      <Header />
      <TailwindTagCollector />
      <Container>
        <Routes>
          <Route
            path="/user"
            element={
              <div>
                <SBTbyPlayerpage />
              </div>
            }
          />
          <Route
            path="/sbt/:sbt"
            element={
              <div>
                <SBTItempage />
              </div>
            }
          />
          <Route path="/about" element={<div>About 페이지</div>} />
          <Route path="/sbtmint" element={<SBTMintpage />} />
          <Route path="/swap" element={<SwapPage />} />
        </Routes>
      </Container>
    </main>
  );
}

export default App;
