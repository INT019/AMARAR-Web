import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages

// obituary pages
import CreateObituary from './pages/CreateObituary';
import DescriptionObituary from './pages/DescriptionObituary';
import EditObituary from './pages/EditObituary';
import ObituaryNav from './components/ObituaryNav';
import PhotoObituary from './pages/PhotoObituary';
import TributeObituary from './pages/TributeObituary';
import DonationObituary from './pages/DonationObituary';
import UserDashObituaryHome from './pages/UserDashObituaryHome';

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
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