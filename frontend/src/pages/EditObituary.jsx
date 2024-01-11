import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditObituary ()
{
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect( () =>
    {
        axios.get( 'http://localhost:8081/read/' + id )
            .then( res =>
            {
                console.log( res )
                setValues( {
                    ...values,
                    fname: res.data[ 0 ].fName,
                    lname: res.data[ 0 ].lName,
                    dob: new Date( res.data[ 0 ].dob ).toISOString().split( 'T' )[ 0 ],
                    dod: new Date( res.data[ 0 ].dod ).toISOString().split( 'T' )[ 0 ],
                    country: res.data[ 0 ].country,
                    city: res.data[ 0 ].city,
                    religion: res.data[ 0 ].religion,
                    title: res.data[ 0 ].title,
                    donation: res.data[ 0 ].donation,
                    description: res.data[ 0 ].description,
                    name: res.data[ 0 ].userName,
                    email: res.data[ 0 ].userEmail,
                    contactNo: res.data[ 0 ].contactNo,
                    nic: res.data[ 0 ].nic
                } )
            } )

            .catch( err => console.log( err ) );
    }, [] );

    const [ values, setValues ] = useState( {
        fname: '',
        lname: '',
        dob: '',
        dod: '',
        country: '',
        city: '',
        religion: '',
        images: '',
        certificates: '',
        title: '',
        donation: '',
        description: '',
        name: '',
        email: '',
        contactNo: '',
        nic: ''
    } );

    const handleEdit = ( event ) =>
    {
        event.preventDefault();

        axios.put( 'http://localhost:8081/edit/' + id, values )
            .then( res =>
            {
                console.log( res )
                navigate( '/' )
            } )

            .catch( err => console.log( err ) );
    }

    return (
        <div>
            <div className='d-flex flex-column justify-content-center align-items-center' style={ { background: '#F2F2F8' } }>
                <h1>EDIT YOUR OBITUARY ....</h1>

                <div className='w-50 rounded p-4' style={ { background: '#D9D9D9' } }>
                    <form onSubmit={ handleEdit }>
                        {/* for personal information */ }

                        <h2>Person's Information</h2>

                        <div className='row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='fname'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='John'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, fname: e.target.value } ) }
                                    value={ values.fname }
                                    required
                                />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor='lname'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Barker'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, lname: e.target.value } ) }
                                    value={ values.lname }
                                    required
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='dob'>Date of Birth:</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, dob: e.target.value } ) }
                                    value={ values.dob }
                                    required
                                />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor='dod'>Date of Death:</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, dod: e.target.value } ) }
                                    value={ values.dod }
                                    required
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='country'>Country:</label>
                                <input
                                    type='text'
                                    placeholder='Sri Lanka'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, country: e.target.value } ) }
                                    value={ values.country }
                                    required
                                />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor='city'>City:</label>
                                <input
                                    type='text'
                                    placeholder='Colombo'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, city: e.target.value } ) }
                                    value={ values.city }
                                    required
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='religion'>Religion:</label>
                                <select
                                    id='religion'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, religion: e.target.value } ) }
                                    value={ values.religion }
                                >
                                    <option>Choose Your Religion</option>
                                    <option>Buddhist</option>
                                    <option>Catholic</option>
                                    <option>Hindu</option>
                                    <option>Islam</option>
                                </select>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='images'>Images:</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, images: e.target.value } ) }
                                    value={ values.images }
                                />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor='certificates'>Certificate of Death:</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, certificates: e.target.value } ) }
                                    value={ values.certificates }
                                />
                            </div>
                        </div>

                        {/* for more information */ }

                        <h2>More Information</h2>

                        <div className='form-group row p-2'>
                            <label htmlFor='title' className='col-sm-2'>Title:</label>

                            <div className='col-sm-10'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Mr. Jhon Baker'
                                    onChange={ e => setValues( { ...values, title: e.target.value } ) }
                                    value={ values.title }
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-group row p-2'>
                            <label htmlFor='donation' className='col-sm-2'>Donation:</label>

                            <div className='col-sm-10'>
                                <select
                                    id='donation'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, donation: e.target.value } ) }
                                    value={ values.donation }
                                >
                                    <option>Choose Your </option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>

                        <div className='form-group row p-2'>
                            <label htmlFor='description' className='col-sm-2'>Description:</label>

                            <div className='col-sm-10'>
                                <textarea
                                    className='form-control'
                                    rows={ 2 }
                                    onChange={ e => setValues( { ...values, description: e.target.value } ) }
                                    value={ values.description }
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* for user information */ }

                        <h2>Your Contact Details</h2>

                        <div className='row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='name'>Name:</label>
                                <input
                                    type='text'
                                    placeholder='Saman Siriwardana'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, name: e.target.value } ) }
                                    value={ values.name }
                                    required
                                />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor='email'>Email:</label>
                                <input
                                    type='email'
                                    placeholder='saman@gmail.com'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, email: e.target.value } ) }
                                    value={ values.email }
                                    required
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='contactNo'>Contact Number:</label>
                                <input
                                    type='phone'
                                    placeholder='0777777777'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, contactNo: e.target.value } ) }
                                    value={ values.contactNo }
                                    required
                                />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor='nic'>NIC:</label>
                                <input
                                    type='text'
                                    placeholder='0123456789'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, nic: e.target.value } ) }
                                    value={ values.nic }
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-check'>
                            <input type='checkbox' className='form-check-input' required />
                            <label className='form-check-label'>I agree Terms and Conditions</label>
                        </div>

                        <button className='btn justify-content-center p-2' style={ { background: '#326346', color: '#ffff' } }>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditObituary