import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Footer from '../components/footer/Footer';
import '../styles/DescriptionObituary.css';

function DescriptionObituary ()
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
    <div className='des-obituary-container'>
      <div className='des-obituary-container-inner'>
        { obituary.length > 0 && (
          <>
            <p className='des-obituary-nav-post-time'>
              { getTimeAgo(
                obituary[ 0 ].createdTime,
                obituary[ 0 ].editedTime
              ) }
            </p>

            <div className='des-obituary-container-post-detail'>
              <div
                className='des-obituary-container-post-detail-description'
                dangerouslySetInnerHTML={ { __html: obituary[ 0 ].description } }
              />

              <div className='des-obituary-container-post-detail-inner'>
                <p className='des-obituary-container-heading'>Overview</p>

                <p className='des-obituary-container-inner-heading'>Location  :
                  <span className='des-obituary-container-inner-heading-inner'>  { obituary[ 0 ].city }, { obituary[ 0 ].country }</span>
                </p>

                <p className='des-obituary-container-inner-heading'>Religion  :
                  <span className='des-obituary-container-inner-heading-inner'>  { obituary[ 0 ].religion }</span>
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

export default DescriptionObituary