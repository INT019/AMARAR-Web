import React from 'react'

import '../styles/Obituary.css';

function ShareObituary ( props )
{
    return ( props.trigger ) ? (
        <div className='popup'>
            <div className='popup_inner'>
                <button
                    className='close_btn'
                    onClick={ () => props.setTrigger( false ) }
                >Close</button>

                { props.children }
            </div>
        </div>
    ) : "";
}

export default ShareObituary