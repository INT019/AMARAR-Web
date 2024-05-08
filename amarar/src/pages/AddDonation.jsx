import axios from 'axios';
import '../styles/donation.css';
import { useState } from 'react';
import swal from 'sweetalert2';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

 

export default function AddDonation() {
    const [donation, setDonation] = useState({
        username: "",
        email: "",
        contact: "",
        type: "",  
        comment: "",
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;

      
        if (type === 'radio' && e.target.checked) {
            setDonation((prev) => ({ ...prev, [name]: value }));
        } else {
            setDonation((prev) => ({ ...prev, [name]: value }));
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("Donation data:", donation);
        try {
            const response = await axios.post("http://localhost:8081/donations", donation, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Server response:", response.data);
            swal.fire("Please wait untill admin contacts you");
        } catch (err) {
            console.error("Error:", err);
            console.log("Error response data:", err.response?.data);
        }
    }

    return (
  
      
        <div className='add-donation-page'>
            <div className='add-donation-header-conatin'>
              <Header/> 
            </div>
            <div className='add-donation-form-conatin'>
                <div className='add-donation-title'>
                <h1>Create Your Donation ...</h1>
                </div>
                <div className='add-donation-form'>
                <div className='donation-form-heading'>
                <h2>Information of Donor</h2> 
                </div>
                <div className='horizontal-line'>
                <hr></hr>
                </div>
                <div className='donation-form-data'>
                    <div className='donation-form-data-first3'>
                        <div className='donation-form-data-first3-label'>
                            <div>
                            <label>User Name:</label>
                            </div>
                            <div>
                            <label>Email:</label>
                            </div>
                            <div>
                            <label>Contact No:</label>
                            </div>
                        </div>
                        <div className='donation-form-data-first3-input'>
                            <div>
                            <input className='add-donation-input' id='username' type='text' onChange={handleChange} name='username' required></input>
                            </div>
                            <div>
                            <input className='add-donation-input' id='email' type='text' onChange={handleChange} name='email'></input>
                            </div>
                            <div>
                            <input className='add-donation-input' id='contact' type='text' onChange={handleChange} name='contact'></input>
                            </div>                 
                        </div>

                    </div>
 
                    <div className='donation-form-type'>
                        <div className='type-label'>
                            <label>Type of Donation:</label>
                        </div>
                        <div className='type-label-inputs'>
                            <div className='type-label-money'>
                                <input type='radio' onChange={handleChange} name='type' value='Money'></input>
                                <label id='radio'>Money</label>
                              

                            </div>
                            <div className='type-label-flower'>
                                <input type='radio' onChange={handleChange} name='type' value='Flowers'></input>
                                <label id='radio'>Flower</label>
                            

                            </div>

                        </div>
                        
                       
                    </div>
                    <div className='donation-form-message'>
                        <label>Message:</label>
                        <p>Ex : I am sorry for your lost</p>
                        <input className='add-donation-input' type='text' id='comment' onChange={handleChange} name='comment'></input>
                        

                    </div>

                </div>
                <div className='donation-submit-btn'>
                    <button onClick={handleClick}>Submit</button>

                </div>
                </div>

            </div>
            <div className='add-donation-footer-contain'>
               <Footer/>
            </div>

        </div>


    )
}
