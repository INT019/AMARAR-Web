import React from 'react'
import '../styles/adminSidebar.css'
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
import Link from 'antd/es/typography/Link'

function AdminSidebar() {
    return(
        <div className="dash-container">
           <div className='adminside-navbar'>
     
          <img className='com-logo' src={amararlogo}/>

               <ul className='admin-top-icons-ul'>
                 <li className='admin-top-icon-li'> <Link to={'/admindashboard'}> <img className='sidebar-icon' src={dashboard}/></Link></li>
                   <li className='admin-top-icon-li'><img className='sidebar-icon' src={myacc}/></li>
               </ul>
               <hr className='nav-hr'/>
               <ul className='middle-icons'>
                   <li className='admin-top-icon-li'><Link to={''}><img className='sidebar-icon' src={menu}/></Link></li>
                   <li className='admin-top-icon-li'><img className='sidebar-icon' src={payment}/></li>
                   <li className='admin-top-icon-li'><img className='sidebar-icon' src={service}/></li>
                   <li className='admin-top-icon-li'><img className='sidebar-icon' src={like}/></li>
                   <li className='admin-top-icon-li'><img className='sidebar-icon' src={tribute}/></li>
                   <li className='admin-top-icon-li'><Link to={'/donationAdminDash'}><img className='sidebar-icon' src={donation}/></Link></li>
               </ul>
               <ul className='logout-link'>
                   <li className='admin-top-icon-li'><img className='sidebar-icon' id='logout' src={logout}/></li>
               </ul>
   
           </div>
        
        </div>
   
       )
}

export default AdminSidebar