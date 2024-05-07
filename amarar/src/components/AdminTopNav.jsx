import React from 'react'
import account from '../images/account.png'
import '../style/adminTopNav.css'
import notification from '../images/bell.png'

function AdminTopNav() {
  return (
    <div className='topNav-container'>
        <div className='nav-icons'>
            <nav className='admin-topNav-nav'>
                <ul className='admin-topNav-ul'>
                    <li className='admin-topNav-li'><img className='notify-icon' src={notification}></img></li>
                    <li className='admin-topNav-li'><img className='acc-icon' src={account}></img></li>
                    
                </ul>
            </nav>

        </div>

    </div>
  )
}

export default AdminTopNav