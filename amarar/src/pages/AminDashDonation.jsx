import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/adminDashDonation.css';
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopNav from "../components/AdminTopNav";
import BackArrow from "../images/icons8-down-50.png";
import { formatDistanceToNow } from 'date-fns'; 
import searchIcon from '../images/search.png';

export default function AdminDashDonation() {
  const [donation, setDonations] = useState([]);
  const [isActiveType, setIsActiveType] = useState(false);
  const [isActiveStatus, setIsActiveStatus] = useState(false);
  const [selectedType, setSelectedType] = useState('All'); // Default to show all types
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/viewdonation')
      .then(res => setDonations(res.data))
      .catch(err => console.log(err));
  }, []);

  
  const filteredDonations = donation.filter(data => {
    return (selectedType === 'All' || data.Type === selectedType) &&
           (searchQuery === '' || data.Username.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const formatTimeAgo = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div className="admin-dash-donation-container">
      <div className="admin-dash-donation-topnav">
        <AdminTopNav />
      </div>
      <div className="donation-admin-dash-bottom-contain">
        <div className="admin-dash-side-nav">
          <AdminSidebar />
        </div>
        <div className="donation-contain">
          <div className="donation-contain-top-bar">
            <h4>Donations</h4>
            <div className="donation-type-filter">
              <div className="dropdown-btn" onClick={() => setIsActiveType(!isActiveType)}>Type
                <img className="admindash-downarrow" src={BackArrow} alt="dropdown-arrow"></img>
              </div>
              {isActiveType && (
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
              )}
            </div>
            <div className="donation-status-filter">
              <div className="status-dropdown-btn" onClick={() => setIsActiveStatus(!isActiveStatus)}>Status
                <img className="admindash-downarrow" src={BackArrow} alt="dropdown-arrow"></img>
              </div>
              {isActiveStatus && (
                <div className="status-dropdown-content" >
                  <div className="status-dropdown-item" >
                    Pending
                  </div>
                  <div className="status-dropdown-item" >
                    Processing
                  </div>
                  <div className="status-dropdown-item">
                    Completed
                  </div>
                </div>
              )}
            </div>
            <div className="admin-dash-donation-search">
              <input type="text" placeholder="Search by name" value={searchQuery} onChange={handleSearchChange} style={{border:'none' , outline:'none', paddingLeft:'10px', paddingRight:'10px'}}/>
              <img className="admin-dash-search-img" src={searchIcon} alt="search-icon"></img>
            </div>
          </div>
          <div className="donation-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Donation ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Type</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((data, i) => (
                  <tr key={i}>
                    <td><Link className="donation-id" to={`/donation/${data.ID}`}>{data.ID}</Link></td>
                    <td>{data.Username}</td>
                    <td>{data.Email}</td>
                    <td>{data.Contact}</td>
                    <td>{data.Type}</td>
                    <td>{formatTimeAgo(data.Date)}</td>
                    <td>{/* Status goes here */}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="btn-admin-dash-new-donation">
                <a href="/donations">New Donation</a>

            </div>
   
          </div>
        </div>
      </div>
    </div>
  );
}
