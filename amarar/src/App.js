import './App.css';
import React, {useState , useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



//Donation User
import AddDonation from "./pages/AddDonation";
import DonationUser from "./pages/DonationsUser";
import DonationUserDash from './pages/UserDashDonation';

//Donation Admin
import AdminDashDonation from './pages/AminDashDonation';
import FetchDonation from './pages/FetchDonation';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

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


import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ForgotPassword from './components/ForgotPassword';
import ForgotPasswordconf from './components/Forgetpasswordconf';




import Create from './pages/Create'


function App ()
{
    // Define state variables for data and setData
    const [data, setData] = useState([]);
    const [email, setEmail] = useState();
    const [otp, setOTP] = useState();
  
    useEffect(() => {
      fetch('http://localhost:8081/users')
        .then((res) => res.json())
        .then((responseData) => setData(responseData))
        .catch((err) => console.log(err));
    }, []);
  


  return (
    <BrowserRouter>
      <Routes>


    <Route path="/donations" element={<AddDonation/>}/>
    <Route path="/viewdonation" element={<DonationUser/>}/>
    <Route path="/donationUserDash" element={<DonationUserDash/>}/>

    <Route path="/donationAdminDash" element={<AdminDashDonation/>}/>
    <Route path="/donation/:id" element={<FetchDonation/>}/>
    <Route path="/adminlogin" element={<AdminLogin/>}/>
    <Route path="/admindashboard" element={<AdminDashboard/>}/>

    <Route path='/' element={ <Home /> } />

            {/* Obituary Function */ }
            <Route path='/userDashObituary' element={ <UserDashObituaryHome /> } />
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

        <Route path='/contactus' element={<Create />}></Route>

        <Route path='/Login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/forgot-password-confirmation' element={<ForgotPasswordconf />} />

      </Routes>
    </BrowserRouter>

      
  );
}

export default App;
