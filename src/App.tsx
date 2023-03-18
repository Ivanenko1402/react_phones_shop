import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';


import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Accessories } from './pages/Accessories';
import { BagPage } from './pages/BagPage';
import { DeviceCatalog } from './pages/DeviceCatalog';
import { EmptyPage } from './pages/EmptyPage';
import { FavPage } from './pages/FavPage';

import { HomePage } from './pages/HomePage';
import { MobileMenu } from './pages/MobileMenu';
import { Tablets } from './pages/Tablets';
import { TargetPhone } from './pages/TargetPhone';
import { PhoneProvider } from './utils/PhoneContext';

const App: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false );
  return (
    <HashRouter>
      <PhoneProvider>
        <div className="app">
          {menuIsOpen && (
            <MobileMenu
              setMenuIsOpen={setMenuIsOpen}
            />
          )}

          {!menuIsOpen && (
            <>
              <Header
                setMenuIsOpen={setMenuIsOpen}
              />
              <section className='section'>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="phones">
                  <Route index element={<DeviceCatalog />} />
                  <Route path=":deviceId" element={<TargetPhone />} />
                </Route>
                <Route path="/tablets" element={<Tablets />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/favorites" element={<FavPage />} />
                <Route path="/cart" element={<BagPage />} />
                <Route path="*" element={<EmptyPage />} />
              </Routes>
              </section>
              <Footer />
            </>
          )}
        </div>
      </PhoneProvider>
    </HashRouter>
  );
}

export default App;
