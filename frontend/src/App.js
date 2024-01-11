import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages
import UserDashObituary from './pages/UserDashObituaryHome';
import CreateObituary from './pages/CreateObituary';
import DescriptionObituary from './pages/DescriptionObituary';
import EditObituary from './pages/EditObituary';

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <UserDashObituary /> } />
        <Route path='/create' element={ <CreateObituary /> } />
        <Route path='/read/:id' element={ <DescriptionObituary /> } />
        <Route path='/edit/:id' element={ <EditObituary /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;