import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'; // Import your CSS file
import validation from './LoginValidation';
import '../footer/footer.css';

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    rememberMe: false // Set initial state of rememberMe to false
  });

  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRememberMe = localStorage.getItem('rememberMe');
  
    if (storedUsername && storedRememberMe) {
      setValues(prevState => ({
        ...prevState,
        username: storedUsername,
        rememberMe: storedRememberMe === 'true'
      }));
    }
  }, []);

  const handleInput = event => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setValues(prevState => ({ ...prevState, [name]: newValue }));
  };

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleSocialMediaClick = (platform) => {
    // Redirect user to OAuth authentication endpoint for the selected platform
    switch(platform) {
      case 'facebook':
        window.location.href = 'https://www.facebook.com/v12.0/dialog/oauth?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=email';
        break;
      case 'instagram':
        window.location.href = 'https://api.instagram.com/oauth/authorize?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user_profile,user_media&response_type=code';
        break;
      case 'google':
        window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile';
        break;
      default:
        break;
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validation(values));

    if (Object.values(errors).every(error => !error)) {
      try {
        const response = await axios.post('http://localhost:8081/login', values);
        if (response.data.success) {
          setLoginSuccess(true);
          setLoginError(false);
          if (values.rememberMe) {
            localStorage.setItem('username', values.username);
            localStorage.setItem('rememberMe', values.rememberMe);
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('rememberMe');
          }
        } else {
          setLoginSuccess(false);
          setLoginError(true);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setLoginError(true);
      }
    }
  };

  return (
    <div className="page">
      <div className='social-icon'>
        <img src={require('../Assets/login img.png')} alt="login" />
      </div>
      <div className='head'> 
        <h1>Welcome Back to Amarar</h1>
      </div>
      <hr className="custom-line" />
      <div className='wrapper'>
        <form className='login-form' onSubmit={handleSubmit}>
          <h2 className='login1'>LOGIN</h2>
          <div className='user'>
            <label htmlFor='username' className='font'>Username</label><br />
            <input className='un' onChange={handleInput} name='username' />
            {errors.username && <span className='error'> {errors.username}</span>}
            <label htmlFor='password' className='passw'>Password:</label><br />
            <div className="password-input-wrapper">
              <input id="password" className='un1' type={showPassword ? 'text' : 'password'} onChange={handleInput} name='password' />
            </div>
            {errors.password && <span className='error'> {errors.password}</span>}
          </div>
          <div className='re'>
            <label>
              <input className='remember' type='checkbox' onChange={handleInput} name='rememberMe' checked={values.rememberMe} />Remember me?</label><br />
          </div>
          <Link to='/forgot-password' className='forget'>Forget Password</Link>
          <button type='submit' className='login-btn'>Login</button>
          <div className='or-line'>
            <div className='or'>
              <h2>OR</h2>
            </div>
            <hr className="line3" />
          </div>
          <hr className="line4" />

          <div className='s-icon'>
            <img src={require('../Assets/fb.jpg')} alt="Facebook" className='fb' onClick={() => handleSocialMediaClick('facebook')} />
            <img src={require('../Assets/insta.jpg')} alt="Instagram" className='ins' onClick={() => handleSocialMediaClick('instagram')} />
            <img src={require('../Assets/google-icon-logo-png-transparent.png')} alt="Google" className='g' onClick={() => handleSocialMediaClick('google')} />
          </div>
          <div className='donot'>
            <p>
              Don't have an account? <Link to='/signup' className="sign">Signup</Link>
            </p>
          </div>
          {loginSuccess && <p className='success-message'>Login successful!</p>}
          {loginError && <p className='error-message'>Login failed. Please check your credentials.</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
