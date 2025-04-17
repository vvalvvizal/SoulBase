import { Header } from '@soulBase/ui/src/components/organisms/Header';
import { Container } from '@soulBase/ui/src/components/atmos/Container';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <main>
      
      <Header />
      <Container>
        <Routes>
          <Route path="/sbts/:sbt" element={<div>sbt 페이지</div>} />
          <Route path="/about" element={<div>About 페이지</div>} />
        </Routes>
      </Container>
    </main>
  );
}

export default App;
