import React from 'react';
import { Link } from 'react-router-dom'
import amararlogo from '../../images/logo.png';
import web from '../../images/web.png'
import account from '../../images/account.png'
import search from '../../images/search.png'
import './Header.css';

function Header ()
{
    return (
        <div className="full-header">
            <div className='upper-header'>
                <div className='logo-img'><Link to={ '#' }>
                    <img src={ amararlogo }></img>
                </Link>


                </div>
                <div className='nav-link-set'>
                    <nav className='header-link-nav'>
                        <ul className='header-link-ul'>
                            <li className='header-link-li'><a className='header-link-a' href='#'>Obituaries</a></li>
                            <li className='header-link-li'><a className='header-link-a' href='#'>Remembrance</a></li>
                            <li className='header-link-li'><a className='header-link-a' href='#'>Price</a></li>
                            <li className='header-link-li'><a className='header-link-a' href='#'>Contact Us</a></li>
                        </ul>
                    </nav>

                </div>
                <div className='btn-and-icons'>
                    <img className='header-web' src={ web }></img>

                    <button type='submit'
                        className='create-post'>Create Post</button>

                    <img className='header-account' src={ account }></img>
                </div>

            </div>
            <div className='lower-header'>
                <div className='header-search'>
                    <div className='search-text'>
                        Search Here
                        {/* <input type='search' placeholder='Search Here'/> */ }
                    </div>
                    <div className='search-icon'>
                        <img src={ search }></img>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Header;