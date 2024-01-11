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
              <h3>{ obituary[ 0 ].description }</h3>
              <h3>{ obituary[ 0 ].country }</h3>
              <h3>{ obituary[ 0 ].city }</h3>
              <h3>{ obituary[ 0 ].religion }</h3>
            </div>

            <button className='btn ms-2' style={ { background: '#326346', color: '#ffff' } }>Edit</button>
          </> ) }
      </div>
    </div>
  )
}

export default DescriptionObituary