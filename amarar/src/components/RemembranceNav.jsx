import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


function RemembranceNav ()
{
    const { id } = useParams();
    const [ remembrance, setRemembrance ] = useState( [] );

    // share group pop
    const [ shareButton, setShareButton ] = useState( false );

    useEffect( () =>
    {
        axios.get( 'http://localhost:8081/read-remembrance/' + id )
            .then( ( res ) =>
            {
                setRemembrance( res.data );
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
                    <Link to='/remembrance-dashboard'>Back</Link>
                </button>

                <h3>Remembrance Details</h3>

                { remembrance.length > 0 && (
                    <div>
                        <div className='p-2'>
                            <img src={ `http://localhost:8081/backend/uploads/images//remembrance/mainImage/${ remembrance[ 0 ].mainImage }` }
                                alt="Thumbnail"
                                style={ {
                                    maxWidth: '100px',
                                    maxHeight: '100px'
                                } }
                            />
                            <h4>{ remembrance[ 0 ].title }</h4>
                            <h5>{ new Date( remembrance[ 0 ].dob ).toLocaleDateString() }</h5>
                            <h5>{ new Date( remembrance[ 0 ].dod ).toLocaleDateString() }</h5>
                            <h6>
                                { getTimeAgo(
                                    remembrance[ 0 ].createdTime,
                                    remembrance[ 0 ].editedTime
                                ) }
                            </h6>

                            <nav className='postNav'>
                                <ul>
                                    {/* <li>
                                        <Link to={ `/read/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Description</Link>
                                    </li>
                                    <li>
                                        <Link to={ `/readTribute/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Tribute</Link>
                                    </li>
                                    <li>
                                        <Link to={ `/readDonation/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Donation</Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={ () => setShareButton( true ) }
                                        >Share</Link>

                                        <ShareObituary
                                            trigger={ shareButton }
                                            setTrigger={ setShareButton }
                                        >
                                            <h4>Share This Post ...</h4>
                                        </ShareObituary>
                                    </li> */}
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
    )
}

export default RemembranceNav