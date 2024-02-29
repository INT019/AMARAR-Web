import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// payment pages
import ObituaryPriceLists from './pages/ObituaryPriceLists';
import RemembrancePriceLists from './pages/RemembrancePriceLists';

// remembrance pages
import UserRemembranceHome from '../src/pages/UserDashObituaryHome';
import CreateRemembrance from '../src/pages/CreateRemembrance';
import RemembranceNav from './components/RemembranceNav';
import DescriptionRemembrance from '../src/pages/DescriptionRemembrance';
import TributeRemembrance from '../src/pages/TributeRemembrance';

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
        <Route path='/create-remembrance' element={ <CreateRemembrance /> } />
        <Route path='/read-remembrance/:id' element={
          <>
            <RemembranceNav />
            <DescriptionRemembrance />
          </>
        } />
        <Route path='/readTribute-remembrance/:id' element={ <TributeRemembrance /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;