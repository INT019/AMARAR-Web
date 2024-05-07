import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


//Donation User
import AddDonation from "./pages/AddDonation";
import DonationUser from "./pages/DonationsUser";
import ObituaryPostPage from './pages/ObituaryPostPage';
import DonationUserDash from './pages/UserDashDonation';

//Donation Admin
import AdminDashDonation from './pages/AminDashDonation';
import FetchDonation from './pages/FetchDonation';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App ()
{
  return (
    <BrowserRouter>
      <Routes>
    <Route path="/donations" element={<AddDonation/>}/>
    <Route path="/viewdonation" element={<DonationUser/>}/>
    <Route path="/read/:id" element={<ObituaryPostPage/>}/>
    <Route path="/donationUserDash" element={<DonationUserDash/>}/>

    <Route path="/donationAdminDash" element={<AdminDashDonation/>}/>
    <Route path="/donation/:id" element={<FetchDonation/>}/>
    <Route path="/adminlogin" element={<AdminLogin/>}/>
    <Route path="/admindashboard" element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
