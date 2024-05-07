import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

//import '../styles/Obituary.css'
import ShareObituary from '../pages/ShareObituary';
import Header from './header/Header';
import '../styles/ObituaryNav.css';

function ObituaryNav ()
{
    const { id } = useParams();
    const [ obituary, setObituary ] = useState( [] );
    const location = useLocation();

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

    return (
        <div className='obituary-nav-container'>
            <div className='header'>
                <Header />
            </div>

            <div className='obituary-nav-container-inner'>

                { obituary.length > 0 && (
                    <div>
                        <div className='obituary-nav-post-detail'>
                            <p className='obituary-nav-post-heading'>Honoring the Life of
                                <span className='obituary-nav-post-title'>{ obituary[ 0 ].title }</span>
                            </p>

                            <p className='obituary-nav-post-dob'>{ new Date( obituary[ 0 ].dob ).toLocaleDateString() }</p>

                            <img src={ `http://localhost:8081/backend/uploads/images/Obituary/mainImage/${ obituary[ 0 ].mainImage }` }
                                alt="Thumbnail"
                                className='obituary-nav-post-img'
                            />

                            <p className='obituary-nav-post-dod'>{ new Date( obituary[ 0 ].dod ).toLocaleDateString() }</p>
                        </div>

                        <nav className='postNav'>
                            <ul>
                                <li className={ location.pathname === `/read/${ id }` ? 'active' : '' }>
                                    <Link to={ `/read/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Description</Link>
                                </li>
                                <li className={ location.pathname === `/readTribute/${ id }` ? 'active' : '' }>
                                    <Link to={ `/readTribute/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Tribute</Link>
                                </li>
                                <li className={ location.pathname === `/readDonation/${ id }` ? 'active' : '' }>
                                    <Link to={ `/readDonation/${ obituary.length > 0 ? obituary[ 0 ].ID : '' }` }>Donation</Link>
                                </li>
                                <li className={ location.pathname === `/readPhotos/${ id }` ? 'active' : '' }>
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
                                        <p className='share-popup-text'>Share This Post ...</p>
                                    </ShareObituary>
                                </li>
                            </ul>
                        </nav>
                    </div>
                ) }

            </div>

            <Link to='/'>Back</Link>

        </div>
    );
}

export default ObituaryNav;