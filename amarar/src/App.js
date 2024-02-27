import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


// remembrance pages
import UserRemembranceHome from './pages/UserRemembranceHome';
import CreateRemembrance from './pages/CreateRemembrance';

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
        {/* Remembrance Function*/ }
        <Route path='/remembrance-dashboard' element={ <UserRemembranceHome /> } />
        <Route path='/create-remembrance' element={ <CreateRemembrance /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;