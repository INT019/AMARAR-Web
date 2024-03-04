import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages
import UserDashObituary from './pages/UserDashObituaryHome';

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <UserDashObituary /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;