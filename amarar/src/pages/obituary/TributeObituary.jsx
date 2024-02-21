import React from 'react'
import ObituaryNav from '../../components/ObituaryNav'

function TributeObituary ()
{
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
                        Tribute
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TributeObituary