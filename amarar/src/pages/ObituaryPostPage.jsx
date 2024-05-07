import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/obituarypost.css';
import DonationUser from './DonationsUser';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ObituaryNav() {
    const { id } = useParams();
    const [obituary, setObituary] = useState([]);
    const [activeSection, setActiveSection] = useState('description');

    useEffect(() => {
        axios
            .get(`http://localhost:8081/read/${id}`)
            .then((res) => {
                console.log(res);
                setObituary(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const changeActiveSection = (section) => {
        setActiveSection(section);
    };

    return (
        <div className='obituary-post-view-page'>
            <div className='obituary-post-view-page-header'>
                <Header/>

            </div>
            <div className='obituary-post-view-container'>
            {obituary.length > 0 && (
                    <>
                        <div className='obituary-frame'>
                            <div className='small-box'>
                                <h5>Honoring the life of</h5>
                                <h5 style={{ fontWeight: 'bold', fontStyle: 'italic' }}>{obituary[0].title}</h5>
                            </div>
                            <div className='dates'>
                                <h4 style={{ marginLeft: '8%' }}>{obituary[0].dob}</h4>
                                <h4 style={{ marginLeft: '26%' }}>{obituary[0].dod}</h4>
                            </div>
                        </div>
                    </>
                )}

            </div>
            <div className='obituary-post-view-navigation-bar'>
            <nav className='postNav'>
                <ul className='ul'>
                    <li>
                        
                        <button onClick={() => changeActiveSection('description')} className={activeSection === 'description' ? 'active' : ''}>
                            Description
                        </button>
                    </li>
                    <li>
                        <button onClick={() => changeActiveSection('tribute')} className={activeSection === 'tribute' ? 'active' : ''}>
                            Tribute
                        </button>
                    </li>
                    <li>
                        <button onClick={() => changeActiveSection('donation')} className={activeSection === 'donation' ? 'active' : ''}>
                            Donation
                        </button>
                    </li>
                    <li>
                        <button onClick={() => changeActiveSection('photos')} className={activeSection === 'photos' ? 'active' : ''}>
                            Photos
                        </button>
                    </li>
                    <li>
                        <button onClick={() => changeActiveSection('share')} className={activeSection === 'share' ? 'active' : ''}>
                            Share
                        </button>
                    </li>
                </ul>
            </nav>
            <div className='sections'>
                {activeSection === 'description' && (
                    <div className='description'>
                        <h2>Description</h2>
                    </div>
                )}
                {activeSection === 'tribute' && (
                    <div className='tribute'>
                        <h2>Tribute</h2>
                    </div>
                )}
                {activeSection === 'donation' && (
                    <div className='donations'>
                        <DonationUser />
                    </div>
                )}
                {activeSection === 'photos' && (
                    <div className='photos'>
                        <h2>Photos</h2>
                    </div>
                )}
                {activeSection === 'share' && (
                    <div className='share'>
                        <h2>Share</h2>
                    </div>
                )}
            </div>

            </div>
            <div className='obituary-post-view-navigation-sections'>

            </div>
            <div className='obituary-post-view-page-footer'>
                <Footer/>

            </div>

        </div>

    );
}

export default ObituaryNav;
