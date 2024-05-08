import React from 'react'
import './Footer.css';

function Footer ()
{
    return (
        <div className='full-footer'>
            <div className='upper-footer'>
                <div className='footer-links'>
                    <nav className='footer-link-list'>
                        <ul>
                            <li><a href='#'>About Us</a></li>
                            <li><a href='#'>Terms of Use</a></li>
                            <li><a href='#'>Company Policy</a></li>
                            <li><a href='#'>Help</a></li>
                            <li><a href='/adminlogin'>Admin</a></li>

                        </ul>
                    </nav>

                </div>

            </div>
            <div className='lower-footer'>
                <div className='lower-footer-text'>
                    <div>amarar.net</div><div className='copyright'>2023.All Rights Reserved.</div>
                </div>

            </div>

        </div>
    )
}

export default Footer