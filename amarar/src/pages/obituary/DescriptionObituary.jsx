import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

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

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center' style={ { background: '#F2F2F8' } }>
        <div className='w-50 rounded p-3'>
          { obituary.length > 0 && (
            <>
              <div className='p-2'>
                {/* <h3>{ obituary[ 0 ].description }</h3> */ }
                <div
                  dangerouslySetInnerHTML={ { __html: obituary[ 0 ].description } }
                />
                <h5>{ obituary[ 0 ].country }</h5>
                <h5>{ obituary[ 0 ].city }</h5>
                <h5>{ obituary[ 0 ].religion }</h5>
              </div>

              {/* <button className='btn ms-2' style={ { background: '#326346', color: '#ffff' } }>Edit</button> */ }
            </> ) }
        </div>
      </div>
    </div>
  )
}

export default DescriptionObituary