import React, { useEffect, useState } from 'react'
import ObituaryNav from '../components/ObituaryNav'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Footer from '../components/footer/Footer';
import '../styles/PhotoObituary.css';

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
        <div className='photo-obituary-container'>
            <ObituaryNav />

            <div className='photo-obituary-container-inner'>
                { images.length > 0 ? (
                    images.map( ( image, index ) => (
                        <div className='photo-obituary'>
                            <img
                                key={ index }
                                src={ `http://localhost:8081/backend/uploads/images/Obituary/otherImages/${ image }` }
                                alt={ `Image ${ index + 1 }` }
                            />
                        </div>
                    ) )
                ) : (
                    <p>No images available</p>
                ) }
            </div>

            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
}

export default PhotoObituary