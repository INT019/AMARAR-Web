import React from "react"
import "./about.css"
import logo from '../../assst/logo.png'

import toggle from '../../assst/accou.png'

import web from '../../assst/web.png'

export default function About(){
    return(
        <div className="navbar">
            <img src={logo} alt="" className="logo" />
            <ul>
                <li>Obituaries</li>
                <li>Remembrance</li>
                <li>Home</li>
                <li>Price</li>
                <li>Contact Us</li>
            </ul>
            
            <li><img src={web} alt=""  className="web"/></li>

            <button className="btn">Create Post</button>

            <img src={toggle} alt="" className="toggle-icon"/>
        </div>
        
    )
}