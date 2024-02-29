import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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

    return (
        <div>
            <div className='d-flex justify-content-center align-items-center' style={ { background: '#F2F2F8' } }>
                <div className='w-50 rounded p-3'>
                    { remembrance.length > 0 && (
                        <>
                            <div className='p-2'>
                                <div
                                    dangerouslySetInnerHTML={ { __html: remembrance[ 0 ].description } }
                                />
                                <h5>{ remembrance[ 0 ].country }</h5>
                                <h5>{ remembrance[ 0 ].city }</h5>
                                <h5>{ remembrance[ 0 ].religion }</h5>
                            </div>

                            {/* <button className='btn ms-2' style={ { background: '#326346', color: '#ffff' } }>Edit</button> */ }
                        </> ) }
                </div>
            </div>
        </div>
    )
}

export default DescriptionRemembrance