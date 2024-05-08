import React, { useEffect } from 'react'
import '../styles/create.css'
import contimg from '../images/contactimg.png'
import { useRef } from 'react';
import emailjs from 'emailjs-com'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'


const Create = () => {

    const form = useRef();


    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_id1xbos', 'template_12uwi8e', form.current, '7qPbU3NmakxISQmqf')
        
        e.target.reset()
      };
 
  return (
    <>


    <section className='contact'>
        <Header/>
        
        <h2 className='topic'><b>Have some questions ? <hr /></b></h2>

        <div className='container contact__container'>
            <div className='contact__optons'>
            
                <article className='contact__option'>
                    <div className='topic1'><h3>Information</h3></div>
                    <h4><b>0771564789</b></h4>
                    <a href="#"><h4><b>info@amarar.net</b></h4></a>
                </article>
                <img src={contimg} alt="" className="contacimg.png"/>
            </div>

            <div className='f-box'>
            <form ref={form} onSubmit={sendEmail}>
                <h3 className='topic1'>Send Us a Message</h3>
                <input type="text" name='name' placeholder='Your Full Name' required />
                <input type="text" name='email' placeholder='Your Email' required />
                <input type="text" name='phone-no' placeholder='Your Phone No' required />
                <textarea name="message" rows="7" placeholder='Message' required></textarea>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
           
            </div>
        </div>
        <Footer/>
    </section>
    </>
  )
}


export default Create

