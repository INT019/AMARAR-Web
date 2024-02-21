import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages
import UserRemembranceHome from './pages/UserRemembranceHome';

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/remembrance-dashboard' element={ <UserRemembranceHome /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;