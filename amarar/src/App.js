import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


// remembrance pages
import UserRemembranceHome from './pages/UserRemembranceHome';
import CreateRemembrance from './pages/CreateRemembrance';
import RemembranceNav from './components/RemembranceNav';
import DescriptionRemembrance from './pages/DescriptionRemembrance';
import TributeRemembrance from './pages/TributeRemembrance';
import EditRemembrance from './pages/EditRemembrance';

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;