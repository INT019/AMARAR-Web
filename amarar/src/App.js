import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages
import ObituaryPriceLists from './pages/ObituaryPriceLists';
import RemembrancePriceLists from './pages/RemembrancePriceLists';

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <ObituaryPriceLists /> } />
        <Route path='/remembrance-price-list' element={ <RemembrancePriceLists /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;