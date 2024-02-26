import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages
import UserRemembranceHome from './pages/UserRemembranceHome';
import CreateRemembrance from './pages/CreateRemembrance';

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
        {/* Payment Function */ }
        <Route path='/' element={ <ObituaryPriceLists /> } />
        <Route path='/remembrance-price-list' element={ <RemembrancePriceLists /> } />

        {/* Remembrance Function*/ }
        <Route path='/remembrance-dashboard' element={ <UserRemembranceHome /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;