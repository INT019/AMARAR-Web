import React, { useEffect, useState } from 'react'
import ObituaryNav from '../../components/ObituaryNav'
import axios from 'axios';
import { useParams } from 'react-router-dom';

// css file
//import '../styles/Obituary.css';

function DonationObituary ()
{
    const { id } = useParams();

    const [ donation, setDonation ] = useState( [] );

    useEffect( () =>
    {
        axios.get( 'http://localhost:8081/readDonation/' + id )
            .then( res => setDonation( res.data ) )
            .catch( err => console.log( err ) );
    }, [] );

    return (
        <div>
            <ObituaryNav />

            <div>
                <div
                    className='d-flex justify-content-center align-items-center'
                    style={ {
                        background: '#F2F2F8'
                    } }>
                    <div className='w-50 rounded p-4'>
                        <div className='container'>
                            <h2>If you need to add a donation <a
                                href='/donations'
                                style={ {
                                    fontStyle: 'italic',
                                    fontSize: '32px',
                                    fontWeight: 'bold',
                                    color: '#326346',
                                    fontFamily: 'Manuale',
                                    textDecoration: 'none'
                                } }>Click Here</a></h2>
                            <hr className='donation-hr'></hr>
                            <div className='donation-container'>
                                {
                                    donation.map( ( data ) => (
                                        <div className='donation-frame'>
                                            <p>{ data.Comment }</p>
                                            <div className='h6'>
                                                <h6>{ data.Username }</h6>
                                                {/* <h6>{ data.Date }</h6> */ }
                                            </div>
                                        </div>
                                    ) )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DonationObituary