import React from 'react';
import './App.css';
import Create from './components/Contact/Create';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';

import Footer from './components/Footer';



function App() {
  return (

  <div className="container">
    <BrowserRouter>
      <Routes>

      <Route path='/' element={<Create />}></Route>
      
      
   
        
        

       
        
      </Routes>
    </BrowserRouter>

  </div>
  );
}

export default App;
