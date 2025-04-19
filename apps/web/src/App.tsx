import { Header } from '@soulBase/ui/src/components/organisms/Header';
import { Container } from '@soulBase/ui/src/components/atmos/Container';
import { Route, Routes } from 'react-router-dom';
import { TailwindTagCollector } from './TailwindTagCollector';
import SBTpage from './pages/SBTpage';
import SBTItempage  from './pages/SBTItempage';
import SBTMintpage from './pages/SBTMintpage';

function App() {
  return (
    <main>
      
      <Header />
      <TailwindTagCollector />
      <Container>
        <Routes>
        <Route path="/sbts" element={<div><SBTpage/></div>} />
          <Route path="/sbts/:sbt" element={<div><SBTItempage/></div>} />
          <Route path="/about" element={<div>About 페이지</div>} />
          <Route path="/sbtmint" element={<SBTMintpage/>}/>
        </Routes>
      </Container>
    </main>
  );
}

export default App;
