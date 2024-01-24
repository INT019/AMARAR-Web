import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

import '../styles/Obituary.css'
import ShareObituary from '../pages/ShareObituary';

function ObituaryNav ()
{
    const { id } = useParams();
    const [ obituary, setObituary ] = useState( [] );

    // share popup
    const [ shareButton, setShareButton ] = useState( false );

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
            const distanceToNow = formatDistanceToNow( new Date( editedTime ), { addSuffix: true, includeSeconds: true } );
            return `Edited ${ distanceToNow.replace( 'about', '' ) }`;
        } else
        {
            const distanceToNow = formatDistanceToNow( new Date( createdTime ), { addSuffix: true, includeSeconds: true } );
            return `${ distanceToNow.replace( 'about', '' ) }`;
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
                                        <Link
                                            onClick={ () => setShareButton( true ) }
                                        >Share</Link>

                                        <ShareObituary
                                            trigger={ shareButton }
                                            setTrigger={ setShareButton }
                                        >
                                            <h3>Share popup</h3>
                                            <p>This is my button popup.</p>
                                        </ShareObituary>
                                    </li>
                                    {/* <li>
                                        <Link to={ `/readShare/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Share</Link>
                                    </li> */}
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