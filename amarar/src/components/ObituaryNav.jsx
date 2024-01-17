import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import "../styles/ObituaryNav.css";

function ObituaryNav ()
{
    const { id } = useParams();

    const [ obituary, setObituary ] = useState( [] );

    useEffect( () =>
    {
        axios.get( 'http://localhost:8081/read/' + id )
            .then( res =>
            {
                console.log( res )
                setObituary( res.data );
            } )
            .catch( err => console.log( err ) );
    }, [] );

    return (
        <div className='d-flex justify-content-center align-items-center' style={ { background: '#F2F2F8' } }>
            <div className='w-50 rounded p-3'>
                <h2>Obituary Details</h2>

                { obituary.length > 0 && (
                    <>
                        <div className='p-2'>
                            <h3>{ obituary[ 0 ].ID }</h3>
                            <h3>{ obituary[ 0 ].title }</h3>
                            <h3>{ obituary[ 0 ].dob }</h3>
                            <h3>{ obituary[ 0 ].dod }</h3>
                            <h3>{ obituary[ 0 ].time }</h3>

                            <nav className='postNav'>
                                <ul>
                                    <li><Link to={ `/readDescription/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Description</Link></li>
                                    <li><Link to={ `/readTribute/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Tribute</Link></li>
                                    <li><Link to={ `/readDonation/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Donation</Link></li>
                                    <li><Link to={ `/readPhotos/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Photos</Link></li>
                                    <li><Link to={ `/readShare/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Share</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </> ) }
            </div>
        </div>
    )
}

export default ObituaryNav