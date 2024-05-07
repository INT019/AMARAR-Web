import React from 'react'
import '../style/Footer.css'

function Footer() {
  return (
    <div className='full-footer'>
        <div className='upper-footer'>
            <div className='footer-links'>
                <nav className='footer-link-nav'>
                    <ul className='footer-link-ul'>
                        <li className='footer-link-li'><a className='footer-link-a' href='#'>About Us</a></li>
                        <li className='footer-link-li'><a className='footer-link-a' href='#'>Terms of Use</a></li>
                        <li className='footer-link-li'><a className='footer-link-a' href='#'>Company Policy</a></li>
                        <li className='footer-link-li'><a className='footer-link-a' href='#'>Help</a></li>
                    </ul>
                </nav>

            </div>

        </div>
        <div className='lower-footer'>
            <div className='lower-footer-text'>
             <div>amarar.net</div><div className='copyright'></div>2023.All Rights Reserved.
            </div>

        </div>

    </div>
  )
}

export default Footer