import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

function CountryCityField ( { onCountryChange, onCityChange } )
{
    const [ country, setCountry ] = useState( [] );
    const [ city, setCity ] = useState( [] );
    const [ selectedCountry, setSelectedCountry ] = useState( null );
    const [ selectedCity, setSelectedCity ] = useState( null );

    useEffect( () =>
    {
        axios.get( 'https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                query: 'countries',
                key: '',
            },
        } )
            .then( response =>
            {
                const countryOptions = response.data.results.map( country => ( {
                    value: country.name,
                    label: country.name,
                    countryCode: country.short_name,
                } ) );
                setCountry( countryOptions );
            } )
            .catch( error =>
            {
                console.error( 'Error fetching countries:', error );
            } );
    }, [] );

    useEffect( () =>
    {
        if ( selectedCountry )
        {
            axios.get( 'https://maps.googleapis.com/maps/api/place/textsearch/json', {
                params: {
                    query: `cities+in+${ selectedCountry.label }`,
                    key: '',
                },
            } )
                .then( response =>
                {
                    const cityOptions = response.data.results.map( city => ( {
                        value: city.name,
                        label: city.name,
                    } ) );
                    setCity( cityOptions );
                } )
                .catch( error =>
                {
                    console.error( 'Error getting city:', error );
                } );
        }
    }, [ selectedCountry ] );

    const handleCountry = ( selectedOption ) =>
    {
        setSelectedCountry( selectedOption );
        setSelectedCity( null );
        onCountryChange( selectedOption.value );
    };

    const handleCity = ( selectedOption ) =>
    {
        setSelectedCity( selectedOption );
        onCityChange( selectedOption.value );
    };

    return (
        <div>
            <div className='form-group col-md-6'>
                <label htmlFor='country'>Country:</label>
                <Select
                    value={ selectedCountry }
                    onChange={ handleCountry }
                    options={ country }
                    placeholder="Select country..."
                />
            </div>

            <div className='form-group col-md-6'>
                <label htmlFor='city'>City:</label>
                <Select
                    value={ selectedCity }
                    onChange={ handleCity }
                    options={ city }
                    placeholder="Select city..."
                    isDisabled={ !selectedCountry }
                />
            </div>
        </div>
    );
}

export default CountryCityField;