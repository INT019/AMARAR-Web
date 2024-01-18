import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

import '../styles/ObituaryNav.css';

function ObituaryNav ()
{
    const { id } = useParams();
    const [ obituary, setObituary ] = useState( [] );

    useEffect( () =>
    {
        axios
            .get( 'http://localhost:8081/read/' + id )
            .then( ( res ) =>
            {
                setObituary( res.data );
            } )
            .catch( ( err ) => console.log( err ) );
    }, [ id ] );

    // for time display
    const getTimeAgo = ( createdTime, editedTime ) =>
    {
        const now = new Date();

        if ( editedTime && editedTime !== createdTime )
        {
            return `Edited ${ formatDistanceToNow( new Date( editedTime ), {
                addSuffix: true,
                includeSeconds: true,
            } ) }`;
        } else
        {
            return `Created ${ formatDistanceToNow( new Date( createdTime ), {
                addSuffix: true,
                includeSeconds: true,
            } ) }`;
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center' style={ { background: '#F2F2F8' } }>
            <div className='w-50 rounded p-3'>
                <button className='btn justify-content-center p-2' style={ { background: '#326346', color: '#ffff' } }>
                    <Link to='/'>Back</Link>
                </button>

                <h2>Obituary Details</h2>

                { obituary.length > 0 && (
                    <div>
                        <div className='p-2'>
                            <h3>{ obituary[ 0 ].title }</h3>
                            <h3>{ obituary[ 0 ].dob }</h3>
                            <h3>{ obituary[ 0 ].dod }</h3>
                            <h3>
                                { getTimeAgo(
                                    obituary[ 0 ].createdTime,
                                    obituary[ 0 ].editedTime
                                ) }
                            </h3>

                            <nav className='postNav'>
                                <ul>
                                    <li>
                                        <Link to={ `/read/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Description</Link>
                                    </li>
                                    <li>
                                        <Link to={ `/readTribute/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Tribute</Link>
                                    </li>
                                    <li>
                                        <Link to={ `/readDonation/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Donation</Link>
                                    </li>
                                    <li>
                                        <Link to={ `/readPhotos/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Photos</Link>
                                    </li>
                                    <li>
                                        <Link to={ `/readShare/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Share</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                ) }
            </div>
        </div>
    );
}

export default ObituaryNav;