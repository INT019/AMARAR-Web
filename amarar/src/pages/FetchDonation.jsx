import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/fetchDonations.css'
import AdminSidebar from '../components/AdminSidebar';
import AdminTopNav from '../components/AdminTopNav';
import donationImage from '../images/donationImage.png'


export default function FetchDonation() {
    const [donationInfo, setDonationInfo] = useState(null);
    const { id } = useParams();
    console.log("ID:", id); // Log the id here to check if it's correctly captured

    useEffect(() => {
      fetch(`http://localhost:8081/donation/${id}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch donation');
              }
              return response.json();
          })
          .then(donationInfo => {
              console.log("Fetched donation:", donationInfo); // Log the response here
              setDonationInfo(donationInfo);
          })
          .catch(error => {
              console.error('Error fetching donation:', error); // Log any errors here
          });
  }, [id]);
  

  if (!donationInfo) return <div>Loading...</div>;

    return (
        <div className='fetch-container'>
            <div className='top-nav'>
                <AdminTopNav/>
            </div>
           <div className='flex-container'>
           <div className='fetch-sidebar'>
            <AdminSidebar/>
            </div>
            <div className='fetch-middle'>
                <div className='posts'>
                <div className='post-details'>
         {
              donationInfo.map((donationInfo)=>(
               <div className='pd-container'>
                <h4 className='pd-title'>Poster's Details</h4>
                <div className='pd-data'>
                <h5><label>Name :</label> {donationInfo.Username}</h5>
                 <h5><label>Email :</label> {donationInfo.Email}</h5>
                 <h5><label>Contact Number :</label> {donationInfo.Contact}</h5>
                </div>
                </div>
                 
         
              ))
            }
        </div>
        <div className='payment-details'>
        <h4 className='pay-title'>Payment Details</h4>
                <div className='pay-data'>
                <h5><label>Payment ID :</label></h5>
                 <h5><label>Type :</label></h5>
                 <h5><label>Payment method :</label></h5>
                 <h5><label>Transaction Date :</label></h5>
                </div>

        </div>

                </div>
          
        <div className='btn-container'>
        <button className='app-btn'>Approve</button>
        <button className='deny-btn'>Deny</button>
        </div>

            </div>
            <img className='donation-image' src={donationImage}></img>
           </div>
        

        </div>
      
    );
}
