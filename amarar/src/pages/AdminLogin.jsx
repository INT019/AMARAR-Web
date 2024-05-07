import React, { useState } from 'react';
import '../style/adminLogin.css';
import {  useNavigate } from 'react-router-dom'; 
import loginImg from "../images/adminlogin.png";
import axios from 'axios';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/login', { email, password })
        .then(res => {
            console.log(res);
            // Redirect to home page after successful login
            navigate('/admindashboard');
            
        })
            
            .catch(err => console.log(err));
    }

    return (
        <div className='admin-login-page'>
            <div className='admin-login-page-container'>
                <div className='admin-login-image-side'>
                    <h3 className='admin-login-imageside-h3'>Welcome Back To Amarar !</h3>
                    <img src={loginImg} alt="login"></img>
                </div>
                <div className='admin-login-form-side'>
                    <div className='admin-login-form'>
                        <div className='admin-login-form-top'>
                            <h3>Login</h3>
                            <hr className='admin-login-hr'></hr>
                        </div>
                        <div className='admin-login-form-data' >
                            <div className='admin-username'>
                                <label>User Name</label>
                                <input type='text' className='admin-input' id='email' onChange={e => setEmail(e.target.value)} required></input>
                            </div>
                            <div className='admin-password'>
                                <label>Password</label>
                                <input type='password' className='admin-input' id='password' onChange={e => setPassword(e.target.value)} required></input>
                            </div>
                        </div>
                        <div className='admin-login-check-box'>
                            <input type="checkbox" className='admin-check-box'></input>
                            <p className='chechbox-p'>Remember Me?</p>
                        </div>
                        <div className='admin-login-button-and-link'>
                            <div>
                                <button className='admin-login-btn' onClick={handleSubmit}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
