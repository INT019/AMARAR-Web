import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import ObituaryNav from '../components/ObituaryNav';

function DescriptionObituary ()
{
  const { id } = useParams();

  const [ obituary, setObituary ] = useState( [] );

  useEffect( () =>
  {
    axios.get( 'http://localhost:8081/readDescription/' + id )
      .then( res =>
      {
        console.log( res )
        setObituary( res.data );
      } )
      .catch( err => console.log( err ) );
  }, [] );

  return (
    <div>
      <ObituaryNav />

      <div className='d-flex justify-content-center align-items-center' style={ { background: '#F2F2F8' } }>
        <div className='w-50 rounded p-3'>
          { obituary.length > 0 && (
            <>
              <div className='p-2'>
                <h3>{ obituary[ 0 ].description }</h3>
                <h3>{ obituary[ 0 ].country }</h3>
                <h3>{ obituary[ 0 ].city }</h3>
                <h3>{ obituary[ 0 ].religion }</h3>
              </div>

              <button className='btn ms-2' style={ { background: '#326346', color: '#ffff' } }>Edit</button>
            </> ) }
        </div>
      </div>
    </div>
  )
}

export default DescriptionObituary