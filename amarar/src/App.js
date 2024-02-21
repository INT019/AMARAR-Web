import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages
import CreateObituary from './pages/obituary/CreateObituary';
import DescriptionObituary from './pages/obituary/DescriptionObituary';
import EditObituary from './pages/obituary/EditObituary';
import ObituaryNav from './components/ObituaryNav';
import PhotoObituary from './pages/obituary/PhotoObituary';
import TributeObituary from './pages/obituary/TributeObituary';
import DonationObituary from './pages/obituary/DonationObituary';
import UserDashObituaryHome from './pages/obituary/UserDashObituaryHome';
import ObituaryPriceLists from './pages/payment/ObituaryPriceLists';
import RemembrancePriceLists from './pages/payment/RemembrancePriceLists';

function App ()
{
  return (
    <BrowserRouter>
      <Routes>

        {/* Payment Function */ }
        <Route path='/' element={ <ObituaryPriceLists /> } />
        <Route path='/remembrance-price-list' element={ <RemembrancePriceLists /> } />

        {/* Obituary Function */ }
        <Route path='/obituary-dashboard' element={ <UserDashObituaryHome /> } />
        <Route path='/create' element={ <CreateObituary /> } />
        <Route path='/read/:id' element={
          <>
            <ObituaryNav />
            <DescriptionObituary />
          </>
        } />
        {/* <Route path='/readDescription/:id' element={ <DescriptionObituary /> } /> */ }
        <Route path='/readTribute/:id' element={ <TributeObituary /> } />
        <Route path='/readDonation/:id' element={ <DonationObituary /> } />
        <Route path='/readPhotos/:id' element={ <PhotoObituary /> } />
        {/* <Route path='/readShare/:id' element={ <ShareObituary /> } /> */ }
        <Route path='/edit/:id' element={ <EditObituary /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;