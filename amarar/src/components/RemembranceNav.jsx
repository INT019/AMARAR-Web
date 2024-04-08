import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

//import '../styles/remembrance.css'
import ShareRemembrance from '../pages/ShareRemembrance';
import Header from './header/Header';
import '../styles/RemembranceNav.css';

function RemembranceNav ()
{
    const { id } = useParams();
    const [ remembrance, setRemembrance ] = useState( [] );
    const location = useLocation();

    // share popup
    const [ shareButton, setShareButton ] = useState( false );

    useEffect( () =>
    {
        axios
            .get( 'http://localhost:8081/read/' + id )
            .then( ( res ) =>
            {
                setRemembrance( res.data );
            } )
            .catch( ( err ) => console.log( err ) );
    }, [ id ] );

    return (
        <div className='remembrance-nav-container'>
            <div className='header'>
                <Header />
            </div>

            <div className='remembrance-nav-container-inner'>

                { remembrance.length > 0 && (
                    <div>
                        <div className='remembrance-nav-post-detail'>
                            <p className='remembrance-nav-post-heading'>Honoring the Life of
                                <span className='remembrance-nav-post-title'>{ remembrance[ 0 ].title }</span>
                            </p>

                            <p className='remembrance-nav-post-dob'>{ new Date( remembrance[ 0 ].dob ).toLocaleDateString() }</p>

                            <img src={ `http://localhost:8081/backend/uploads/images/remembrance/mainImage/${ remembrance[ 0 ].mainImage }` }
                                alt="Thumbnail"
                                className='remembrance-nav-post-img'
                            />

                            <p className='remembrance-nav-post-dod'>{ new Date( remembrance[ 0 ].dod ).toLocaleDateString() }</p>
                        </div>

                        <nav className='postNav'>
                            <ul>
                                <li className={ location.pathname === `/read/${ id }` ? 'active' : '' }>
                                    <Link to={ `/read/${ remembrance.length > 0 ? remembrance[ 0 ].ID : '' }` }>Description</Link>
                                </li>
                                <li className={ location.pathname === `/readTribute/${ id }` ? 'active' : '' }>
                                    <Link to={ `/readTribute/${ remembrance.length > 0 ? remembrance[ 0 ].ID : '' }` }>Tribute</Link>
                                </li>
                                <li className={ location.pathname === `/readDonation/${ id }` ? 'active' : '' }>
                                    <Link to={ `/readDonation/${ remembrance.length > 0 ? remembrance[ 0 ].ID : '' }` }>Donation</Link>
                                </li>
                                <li className={ location.pathname === `/readPhotos/${ id }` ? 'active' : '' }>
                                    <Link to={ `/readPhotos/${ remembrance.length > 0 ? remembrance[ 0 ].ID : '' }` }>Photos</Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={ () => setShareButton( true ) }
                                    >Share</Link>

                                    <ShareRemembrance
                                        trigger={ shareButton }
                                        setTrigger={ setShareButton }
                                    >
                                        <p className='share-popup-text'>Share This Post ...</p>
                                    </ShareRemembrance>
                                </li>
                            </ul>
                        </nav>
                    </div>
                ) }

            </div>

            <Link to='/remembrance-dashboard'>Back</Link>

        </div>
    );
}

export default RemembranceNav;