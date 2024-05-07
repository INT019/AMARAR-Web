import React, { useState, useEffect } from 'react';
import AdminTopNav from '../components/AdminTopNav';
import AdminSidebar from '../components/AdminSidebar';
import '../style/adminDashboard.css';
import DashboardImage from '../images/dashboardimage.png';
import axios from "axios";

function AdminDashboard() {
    const [donations, setDonations] = useState([]);
    const [obituary, setObituary] = useState([]);
    const [remembrance, setRemembrance] = useState([]);

    useEffect(() => {
        fetchDonations();
        fetchObituaries();
        fetchRemembrance();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await axios.get('http://localhost:8081/viewdonation');
            if (response.status !== 200) {
                throw new Error('Failed to fetch donations');
            }
            // Assuming response.data is an array of donation objects
            setDonations(response.data);
        } catch (error) {
            console.error('Error fetching donations:', error);
        }
    };

    const calculateDonationCount = () => {
        return donations.length;
    };

   //obituary count

    const fetchObituaries = async () => {
        try {
            const response = await axios.get('http://localhost:8081/viewobituary');
            if (response.status !== 200) {
                throw new Error('Failed to fetch donations');
            }
            // Assuming response.data is an array of donation objects
            setObituary(response.data);
        } catch (error) {
            console.error('Error fetching obituaries:', error);
        }
    };

    const calculateObituaryCount = () => {
        return obituary.length;
    };

    //remembrance count
    const fetchRemembrance = async () => {
        try {
            const response = await axios.get('http://localhost:8081/viewremembrance');
            if (response.status !== 200) {
                throw new Error('Failed to fetch donations');
            }
            // Assuming response.data is an array of donation objects
            setRemembrance(response.data);
        } catch (error) {
            console.error('Error fetching donations:', error);
        }
    };

    const calculateRemembranceCount = () => {
        return remembrance.length;
    };



    return (
        <div className='admin-dashboard-page'>
            <div className="top-nav-container-admindashboard">
                <AdminTopNav/>
            </div>
            <div className="botom-container-admindashboard">
                <div className="side-nav-container-admindashboard">
                    <AdminSidebar/>
                </div>
                <div className="admin-dashboard-container">
                    <div className='admin-dash-first-row'>
                        <div className='dash-obituary-card'>
                            <div className='obituary-count'>
                            <div>
                            OBITUARY
                            </div>
                            <div className='donation-count'>{calculateObituaryCount()}</div>
                           
                            </div>
                      
                       

                            </div>
                        <div className='dash-remembrance-card' >
                        <div>
                        REMEMBRANCE
                            </div>
                            <div className='donation-count'>{calculateRemembranceCount()}</div>

                        </div>
                        <div className='dash-donation-card' >
                        <div>
                            DONATION
                            </div>
                            <div className='donation-count'>{calculateDonationCount()}</div>


                            </div>
                        <div className='admin-dash-image'><img src={DashboardImage} alt="Dashboard" /></div>
                    </div>
                    <div className='admin-dash-second-row'>
                        <div className='dash-annualIncome-card'></div>
                        <div className='dash-Posts-card'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
