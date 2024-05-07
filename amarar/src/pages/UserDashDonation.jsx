import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"
import '../styles/userDashDonation.css'
import UserSidebar from "../components/UserSidebar";
import Header from "../components/Header"
import Footer from "../components/Footer"
import downArrow from "../images/icons8-down-50.png"
import { formatDistanceToNow } from 'date-fns';

function UserDashDonation() {

   const [donation , setDonations] = useState([]);
   const [isActive , setIsActive] = useState(false);
   const [selectedType, setSelectedType] = useState('All'); // Default to show all types

   useEffect(() => {
    axios.get('http://localhost:8081/viewdonation')
    .then(res => setDonations(res.data))
    .catch(err => console.log(err));

},[])

 // Filter donations based on the selected type
 const filteredDonations = selectedType === 'All'
 ? donation
 : donation.filter(data => data.Type === selectedType);

 const handleTypeChange = (type) => {
    setSelectedType(type);
  };
  const formatTimeAgo = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };
  
  return (
    <div className='donation-dash-container'>
        <div className='donation-dash-topnav-contain'>
            <Header/>

        </div>
        <div className='donation-dash-bottom-contain'>
            <div className='donation-user-dash-sidebar'>
                <UserSidebar/>
            </div>
            <div className='donation-user-dash-data-contain'>
                <div className='filter-user-dash'>
                <div className="dropdown-btn-user" onClick={(e) => setIsActive(!isActive)}>Type
                <img className='downarrow' src={downArrow}/>
                </div>
            {
                isActive && (
                    <div className="dropdown-content" >
                    <div className="dropdown-item" onClick={() => handleTypeChange('All')}>
                    All
                    </div>
                    <div className="dropdown-item" onClick={() => handleTypeChange('Money')}>
                    Money
                    </div>
                    <div className="dropdown-item" onClick={() => handleTypeChange('Flowers')}>
                    Flower
                    </div>  
                    </div>

                )
            }

                </div>
                <div className='table-contain-user-dash'>
                <table className="table-user-dash">
                    <thead>
                        <tr>
                        <th>Donation recieved person</th>
                        <th>Type</th>
                        <th>Time</th>
                        <th>Status</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            filteredDonations.map((data,i) =>(
                                <tr key={i}>
                                    <td>{data.Username}</td>
                                    <td>{data.Type}</td>
                                    <td>{formatTimeAgo(data.Date)}</td>
                                    <td>{}</td>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>

                </div>
                <div className="btn-user-dash-new-donation">
                <a href="/donations">New Donation</a>

            </div>

            </div>


        </div>
        <div className='user-dash-footer'> 
        <Footer/>

        </div>

    </div>
  )
}

export default UserDashDonation