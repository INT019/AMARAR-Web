import React, { useState } from 'react'
import '../styles/userSidebar.css'
import { Link } from 'react-router-dom'
import amararlogo from '../images/amararlogo.png'
import dashboard from '../images/dashboard (1).png'
import myacc from '../images/myAcc.png'
import menu from '../images/menu.png'
import payment from '../images/payment.png'
import service from '../images/service.png'
import like from '../images/candle.png'
import tribute from '../images/chat.png'
import donation from '../images/heart.png'
import logout from '../images/logout (2).png'

function UserSidebar() {

    const [ showDropdown, setShowDropdown ] = useState( false );

    const toggleDropdown = () =>
    {
        setShowDropdown( !showDropdown );
    };

  return (
        <div className="dash-container">
           <div className='user-side-navbar'>

               <ul className='user-sidebar-ul-top'>
                   <li className='user-sidebar-li'><img className='sidebar-icon' src={dashboard}/>Dashboard</li>
                   <li className='user-sidebar-li'><img className='sidebar-icon' src={myacc}/>My Account</li>
               </ul>
               <hr className='nav-hr'/>
               <ul className='user-sidebar-ul-middle'>
               <li className={ `user-sidebar-li dropdown-container ${ showDropdown ? 'open' : '' }` } onClick={ toggleDropdown }>
                        <img className='sidebar-icon' src={ menu } />
                        My Post
                        { showDropdown && (
                            <div className='side-nav-drop-down'>
                                <Link to="/userDashObituary">Obituary</Link>
                                <Link to="/remembrance-dashboard">Remembrance</Link>
                            </div>
                        ) }
                    </li>
                   <li className='user-sidebar-li'><img className='sidebar-icon' src={payment}/>Payment</li>
                   <li className='user-sidebar-li'><img className='sidebar-icon' src={service}/>Contact Us</li>
                   <li className='user-sidebar-li'><img className='sidebar-icon' src={like}/>Likes</li>
                   <li className='user-sidebar-li'><img className='sidebar-icon' src={tribute}/>Tributes</li>

                   <li className='user-sidebar-li'><Link to={'/donationUserDash'}><img className='sidebar-icon' src={donation}/></Link>Donations</li>
               </ul>
               <ul className='logout-link'>
                   <li className='user-sidebar-li'><img className='sidebar-icon' id='logout' src={logout}/>Logout</li>
               </ul>
   
           </div>
        
        </div>
   
       )
}


export default UserSidebar