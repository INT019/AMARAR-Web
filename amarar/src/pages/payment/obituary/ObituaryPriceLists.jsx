import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

//css
import '../../../styles/payment/ObituaryPriceLists.css';

function ObituaryPriceLists ()
{
    const [ selectedPlan, setSelectedPlan ] = useState( '' );
    const [ selectedType, setSelectedType ] = useState( 'obituary' );

    const plans = [
        {
            name: 'Basic',
            price: 10,
            wordLimit: 50,
            donation: false,
            photos: false,
            videos: false,
        },

        {
            name: 'Standard',
            price: 12,
            wordLimit: 70,
            donation: true,
            photos: true,
            videos: false,
        },

        {
            name: 'Premium',
            price: 15,
            wordLimit: -1,
            donation: true,
            photos: true,
            videos: true,
        },
    ];

    const navigate = useNavigate();

    const handleType = () =>
    {
        setSelectedType( 'remembrance' );
        navigate( '/remembrance-price-list' );
    }

    const handleBuy = () => [
        navigate( '/create' )
    ]

    return (
        <div className='obituary-plans'>
            <div className='plans-types'>
                <button
                    className={ `plan-type ${ selectedType === 'obituary' ? 'active' : '' }` }
                    onClick={ () => setSelectedType( 'obituary' ) }
                >Obituary</button>

                <button
                    className={ `plan-type ${ selectedType === 'remembrance' ? 'active' : '' }` }
                    onClick={ handleType }
                >Remembrance</button>
            </div>
            <h2 className='heading'>CHOOSE THE OBITUARY PLAN THAT'S BEST FOR YOU !</h2>

            { plans.map( ( plan ) => (
                <div
                    key={ plan.name }
                    className={ `plan ${ selectedPlan === plan.name ? 'selected' : '' }` }
                    onClick={ () => setSelectedPlan( plan.name ) }
                >
                    <h3 className='plan-name'>{ plan.name }</h3>
                    <h3 className='plan-price'>{ plan.price }</h3>

                    <div className='plan-features'>
                        <p>{ plan.wordLimit === -1 ? 'Unlimited' : `${ plan.wordLimit } words` }</p>
                        <p>{ plan.donation ? 'Yes' : 'No' }</p>
                        <p>{ plan.photos ? 'Yes' : 'No' }</p>
                        <p>{ plan.videos ? 'Yes' : 'No' }</p>
                    </div>

                    <button
                        className='plan-description'
                        onClick={ handleBuy }
                    >Buy</button>
                </div>
            ) ) }
        </div>
    )
}

export default ObituaryPriceLists