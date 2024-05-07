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

// remembrance pages
import UserRemembranceHome from './pages/UserRemembranceHome';
import CreateRemembrance from './pages/CreateRemembrance';
import DescriptionRemembrance from './pages/DescriptionRemembrance';
import TributeRemembrance from './pages/TributeRemembrance';
import EditRemembrance from './pages/EditRemembrance';
import RemembranceNav from './components/RemembranceNav';
import ShareRemembrance from './pages/ShareRemembrance';
import Home from './pages/Home';

function App ()
{
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/home' element={ <Home /> } />

        {/* Obituary Function */ }
        <Route path='/' element={ <UserDashObituaryHome /> } />
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
        <Route path='/edit-remembrance/:id' element={ <EditRemembrance /> } />
      </Routes >
    </BrowserRouter >
  );
}

export default App;