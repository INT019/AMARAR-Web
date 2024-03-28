import React, { useEffect, useState } from 'react'
import ObituaryNav from '../components/ObituaryNav'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Footer from '../components/footer/Footer';

function PhotoObituary ()
{
    const { id } = useParams();

    const [ images, setImages ] = useState( [] );

    useEffect( () =>
    {
        axios.get( 'http://localhost:8081/readPhotos/' + id )
            .then( res =>
            {
                console.log( res );
                const imageData = res.data[ 0 ];
                const otherImages = JSON.parse( imageData.otherImages || [] );

                console.log( otherImages );

                setImages( otherImages );
            } )
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
                        { images.length > 0 ? (
                            images.map( ( image, index ) => (
                                <img
                                    key={ index }
                                    src={ `http://localhost:8081/backend/uploads/images/Obituary/otherImages/${ image }` }
                                    alt={ `Image ${ index + 1 }` }
                                    style={ {
                                        maxWidth: '150px',
                                        maxHeight: '150px',
                                        objectFit: 'cover'
                                    } }
                                />
                            ) )
                        ) : (
                            <p>No images available</p>
                        ) }
                    </div>
                </div>
            </div>

            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
}

export default PhotoObituary