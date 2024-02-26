import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages
import CreateRemembrance from './pages/CreateRemembrance';
=======

// obituary pages
import CreateObituary from './pages/obituary/CreateObituary';
import DescriptionObituary from './pages/obituary/DescriptionObituary';
import EditObituary from './pages/obituary/EditObituary';
import ObituaryNav from './components/ObituaryNav';
import PhotoObituary from './pages/obituary/PhotoObituary';
import TributeObituary from './pages/obituary/TributeObituary';
import DonationObituary from './pages/obituary/DonationObituary';
import UserDashObituaryHome from './pages/obituary/UserDashObituaryHome';

// remembrance pages
import UserRemembranceHome from './pages/remembrance/UserRemembranceHome';

// payment pages

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
        {/* Payment Function */ }
        <Route path='/' element={ <ObituaryPriceLists /> } />
        <Route path='/remembrance-price-list' element={ <RemembrancePriceLists /> } />

        {/* Remembrance Function*/ }

        {/* Remembrance Function*/ }
        <Route path='/remembrance-dashboard' element={ <UserRemembranceHome /> } />
        <Route path='/create-remembrance' element={ <CreateRemembrance /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;