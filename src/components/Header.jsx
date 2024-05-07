import React from 'react';
import {Link} from 'react-router-dom';
import amararlogo from '../images/amararlogo.png';
import web from '../images/web.png';
import account from '../images/account.png';
import search from '../images/search.png';
import './Header.css';

function Header ()
{
    return (
        <div className="full-header">
            <div className='upper-header'>
                <div className='logo-img'><Link to={'#'}> 
                <img src={amararlogo}></img>
                </Link>
              
        
                </div>
                <div className='nav-link-set'>
                    <nav>
                        <ul>
                            <li><a href='#'>Obituaries</a></li>
                            <li><a href='#'>Remembrance</a></li>
                            <li><a href='#'>Price</a></li>
                            <li><a href='#'>Contact Us</a></li>
                        </ul>
                    </nav>

                </div>
                <div className='btn-and-icons'>
                 <img className='header-web' src={web}></img>
                 
                 <button className='create-post'>Create Post</button>

                 <img className='header-account' src={account}></img>
                </div>

            </div>
            <div className='lower-header'>
                <div className='header-search'>
                    <div className='search-text'>
                    Search Here
                    </div>
                    <div className='search-icon'>
                    <img src={search}></img>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Header;