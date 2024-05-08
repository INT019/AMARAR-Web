import React from "react"
import './footer.css'

export default function Footer () {
  return (
     <div className="main_f">
      <div className="container">
        
      </div>
      <div className="row">
          <div className="col">
            <ul>
              <li><h3>About Us</h3></li>
              <li><h3>Tream of Use</h3></li>
              <li><h3>Company Policy</h3></li>
              <li><h3>Help</h3></li>
            </ul>
          </div>
        </div>
     
        <p className="col-sm">
          amarar.net &copy;{new Date().getFullYear()}|All Rights Reserved.
        </p>
      </div>

     
  )
}
