import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// import pages
import Create from './pages/Create'

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/contactus' element={<Create />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
