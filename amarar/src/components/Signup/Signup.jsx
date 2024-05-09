import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import validation from './SignupValidation'
import axios from 'axios';
import './Signup.css'; // Import your CSS file


export default function Signup() {

  const [values, setValues] = useState({           //validation
    firstname: '',
    lastname:'',
    email:'',
    contact:'',
    username: '',
    password: '',
    confirmpassword: ''

  })

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  


  const handleSubmit =(event) => {
      event.preventDefault();
     // setErrors(validation(values));
   //   if(errors.username === "" && errors.email === "" && errors.password === ""){
        axios.post('http://localhost:8081/signup', values)
        .then(res => {
           console.log(res);
           navigate('/Login');
        })
        .catch(err => {
           console.log(err);
           
        });
    //  }
  }

  const handleSocialMediaClick = (platform) => {
    // Redirect user to OAuth authentication endpoint for the selected platform
    switch (platform) {
      case 'facebook':
        window.location.href = 'YOUR_FACEBOOK_AUTH_URL';
        break;
      case 'instagram':
        window.location.href = 'YOUR_INSTAGRAM_AUTH_URL';
        break;
      case 'google':
        window.location.href = 'YOUR_GOOGLE_AUTH_URL';
        break;
      default:
        break;
    }
  };

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  
  const handleSocialMediaLogin = (platform) => {
    // Implement social media login functionality
    console.log(`Logging in with ${platform}`);
  };

  return (
    <div className='page'>
      <div className='head'> 
        <h1>Create New Account</h1>
      </div>
      <hr className="custom-line-sign" />

      <form action="" onSubmit={handleSubmit} className="form">
      <h2 className='signup'>SIGN UP</h2>
        <div className='register'>
          <p>Already have an account? <Link to="/Login" className='log'>Login</Link></p>
        </div>

        <div className='personal'> 
        <h2>Personal Information</h2>
      </div>
      <hr className="custom-line1" />
                
                    <div className='user'>
                       <label htmlFor="fname" className='fname'>First Name*</label><br></br>
                       <input type="text" className="text1"  name="firstname" onChange={handleInput} /><br></br>
                       {errors.firstname && <span> {errors.firstname}</span>}<br></br>


                       <label htmlFor="lname" className='lname'>Last Name*</label><br></br>
                       <input type="text" className="text2"  name="lastname" onChange={handleInput} /><br></br>
                       {errors.lastname && <span> {errors.lastname}</span>}
                       
                       <label htmlFor="email" className='em'>Email*</label><br></br>
                       <input type="text" className="eml"  name="email" onChange={handleInput} /><br></br>
                       {errors.email && <span> {errors.email}</span>}


                         <label htmlFor="contact" className='con'>Contact*</label><br></br>
                       <input type="text" className="text4" name="contact"  onChange={handleInput} /><br></br>
                       {errors.contact && <span> {errors.contact}</span>}

                       <label htmlFor="username" className='uname'>Username*</label><br></br>
                       <input type="text" className="usname" name="username"  value={values.username}  onChange={handleInput} />
                       {errors.username && <span> {errors.username}</span>}



                       <div className='login-infor'> 
                       <h2>Login Information</h2>
                       </div>
                       <hr className="custom-line2" />
                
                         <label for="password" className='password'>Password*</label><br></br>
                         <input type="password" className='text6' name="password" onChange={handleInput} />
                         {errors.password && <span> {errors.password}</span>}

                         <label for="cpassword" className='cpass'>Confirm Password*</label><br></br>
                         <input type="password" className='text7' name="confirmpassword"  onChange={handleInput} />
                         {errors.confirmpassword && <span> {errors.confirmpassword}</span>}

                    </div>

                    <label htmlFor="uname" className='type'>Select Your Type*</label><br></br>


                      <div className='rem'>
                            <label><input className='remember' type="checkbox" />Add Post</label><br></br>
                      </div>
                     
                      <div className='don'>
                            <label><input className='remember' type="checkbox" />Donation</label><br></br>
                      </div>
                
                      <div className='or-line1'>
            <hr className="custom-line3" /> 
            <div className='or'>
              <h2>OR</h2>
            </div>
            <hr className="custom-line4" />
          </div>

          <div className='so-icon'>
          <img src={require('../Assets/fb.jpg')} alt="Facebook" className='fb1' onClick={() => handleSocialMediaLogin('facebook')} />
          <img src={require('../Assets/insta.jpg')} alt="Instagram" className='ins1' onClick={() => handleSocialMediaLogin('instagram')} />
          <img src={require('../Assets/google-icon-logo-png-transparent.png')} alt="Google" className='g1' onClick={() => handleSocialMediaLogin('google')} />
        </div> 

          <div className='social-icon1'>
        <img src={require('../Assets/reg.png')} alt="login" />
      </div>

      <button type='submit' className='sign-btn'>SIGN UP</button>

                <div>
  
    </div>

         
          
         </form>
        </div>
  )
}
