import { useState } from 'react';
import './styles/global.css';

import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Nav from './components/Nav';
import FloatingCode from './components/FloatingCode';
import Hero from './components/Hero';
import Origin from './components/Origin';
import Struggle from './components/Struggle';
import Deadline from './components/Deadline';
import Growth from './components/Growth';
import Final from './components/Final';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Cursor />
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <>
          <FloatingCode density={14} />
          <Nav />
          <main>
            <Hero />
            <Origin />
            <Struggle />
            <Deadline />
            <Growth />
            <Final />
          </main>
        </>
      )}
    </>
  );
}
