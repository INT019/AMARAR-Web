import React from 'react'
import RemembranceNav from '../components/RemembranceNav'

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
        </div>
    )
}

export default TributeRemembrance