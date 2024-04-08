import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns';
import Footer from '../components/footer/Footer';
import '../styles/DescriptionRemembrance.css'

function DescriptionRemembrance ()
{
    const { id } = useParams();
    const [ remembrance, setRemembrance ] = useState( [] );

    useEffect( () =>
    {
        axios.get( 'http://localhost:8081/read-remembrance/' + id )
            .then( res =>
            {
                console.log( res )
                setRemembrance( res.data );
            } )

            .catch( err => console.log( err ) );
    }, [] );

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
        <div className='des-remembrance-container'>
            <div className='des-remembrance-container-inner'>
                { remembrance.length > 0 && (
                    <>
                        <p className='des-remembrance-nav-post-time'>
                            { getTimeAgo(
                                remembrance[ 0 ].createdTime,
                                remembrance[ 0 ].editedTime
                            ) }
                        </p>

                        <div className='des-remembrance-container-post-detail'>
                            <div
                                className='des-remembrance-container-post-detail-description'
                                dangerouslySetInnerHTML={ { __html: remembrance[ 0 ].description } }
                            />

                            <div className='des-remembrance-container-post-detail-inner'>
                                <p className='des-remembrance-container-heading'>Overview</p>

                                <p className='des-remembrance-container-inner-heading'>Location  :
                                    <span className='des-remembrance-container-inner-heading-inner'>  { remembrance[ 0 ].city }, { remembrance[ 0 ].country }</span>
                                </p>

                                <p className='des-remembrance-container-inner-heading'>Religion  :
                                    <span className='des-remembrance-container-inner-heading-inner'>  { remembrance[ 0 ].religion }</span>
                                </p>
                            </div>
                        </div>

                        {/* <button className='btn ms-2' style={ { background: '#326346', color: '#ffff' } }>Edit</button> */ }
                    </> ) }
            </div>

            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
}

export default DescriptionRemembrance