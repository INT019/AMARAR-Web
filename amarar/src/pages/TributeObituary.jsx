import React from 'react'
<<<<<<<< HEAD:amarar/src/pages/TributeObituary.jsx
import ObituaryNav from '../components/ObituaryNav'
import Footer from '../components/footer/Footer';
========
import RemembranceNav from '../components/RemembranceNav'
import Footer from '../components/footer/Footer'
>>>>>>>> Remembrance_(Amasha):amarar/src/pages/TributeRemembrance.jsx

function TributeRemembrance ()
{
    return (
        <div>
            <RemembranceNav />

            <div>
                <div
                    className='d-flex justify-content-center align-items-center'
                    style={ {
                        background: '#F2F2F8'
                    } }>
                    <div className='w-50 rounded p-4'>
                        Tribute
                    </div>
                </div>
            </div>

            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
}

export default TributeRemembrance