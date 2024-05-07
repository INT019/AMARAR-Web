import React from "react"
import './search.css'
import search from '../../assst/search.png'

export default function Search (){
    return(
    
    <div className="box">
        <div className="search-box">
            <input type="text" placeholder="Search"/>
            <img src={search} alt="" />
            </div>
        </div>
    
    )
}