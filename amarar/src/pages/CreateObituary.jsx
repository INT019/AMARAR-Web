import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ObituaryForm ()
{
    const [ values, setValues ] = useState( {
        fname: '',
        lname: '',
        dob: '',
        dod: '',
        country: '',
        city: '',
        religion: '',
        images: '',
        certificate: '',
        title: '',
        donation: '',
        description: '',
        name: '',
        email: '',
        contactNo: '',
        nic: ''
    } );

    const navigate = useNavigate();

    // for handle image uploading
    const handleImages = ( e ) =>
    {
        setValues( {
            ...values,
            images: e.target.files[ 0 ],
        } );
    };

    // handle certificate upload
    const handleCertification = ( e ) =>
    {
        setValues( {
            ...values,
            certificate: e.target.files[ 0 ],
        } );
    };

    // for description
    const modules = {
        toolbar: {
            container: [
                [ { 'header': [ 1, 2, 3, 4, 5, false ] } ],
                [ 'bold', 'italic', 'underline' ],
                [ { 'align': [] } ],
                [ { 'list': 'ordered' }, { 'list': 'bullet' } ],
                [ { 'color': [] }, { 'background': [] } ],
            ],
        },
    };

    // const formats = [
    //     'header', 'font', 'size',
    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
    //     'list', 'bullet', 'indent',
    //     'color', 'align', 'background',
    // ];

    const handleDescriptionChange = ( content ) =>
    {
        setValues( { ...values, description: content } );
    };

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();

        const formData = new FormData();
        Object.entries( values ).forEach( ( [ key, value ] ) =>
        {
            formData.append( key, value );
        } );

        // formData.append( 'images', values.images );
        // formData.append( 'certificate', values.certificate );

        axios.post( 'http://localhost:8081/obituary', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        } )
            .then( res =>
            {
                console.log( res );
                navigate( '/' )
            } )
            .catch( err => console.log( err ) );

    }

    return (
        <div>
            <div className='d-flex flex-column justify-content-center align-items-center' style={ { background: '#F2F2F8' } }>
                <h1>CREATE YOUR OBITUARY ....</h1>

                <div className='w-50 rounded p-4' style={ { background: '#D9D9D9' } }>
                    <form
                        onSubmit={ handleSubmit }
                        encType='multipart/form-data'
                    >
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
                                    required
                                />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor='dod'>Date of Death:</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, dod: e.target.value } ) }
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
                                <label htmlFor='images'>images:</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={ handleImages }
                                />
                            </div>
                            {/* <div className='form-group col-md-6'>
                                <label htmlFor='images'>images:</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, images: e.target.value } ) }
                                    multiple
                                />
                            </div> */}

                            <div className='form-group col-md-6'>
                                <label htmlFor='certificate'>Certificate of Death:</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={ handleCertification }
                                />
                            </div>
                            {/* <div className='form-group col-md-6'>
                                <label htmlFor='certificate'>Certificate of Death:</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, certificate: e.target.value } ) }
                                />
                            </div> */}
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
                                >
                                    <option>Choose Your </option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>

                        <div className='form-group row p-2'>
                            <label htmlFor='description' className='col-sm-2'>Description:</label>

                            <div
                                className='col-sm-10'
                            >
                                <ReactQuill
                                    theme='snow'
                                    style={ { height: '300px', background: '#fff', borderRadius: '10px' } }
                                    value={ values.description }
                                    onChange={ handleDescriptionChange }
                                    modules={ modules }
                                    //formats={ formats }
                                    required
                                />

                                {/* <textarea
                                    className='form-control'
                                    rows={ 2 }
                                    onChange={ e => setValues( { ...values, description: e.target.value } ) }
                                    required
                                ></textarea> */}
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
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-check'>
                            <input type='checkbox' className='form-check-input' required />
                            <label className='form-check-label'>I agree <a
                                href='/'
                                style={ { color: '#326346' } }
                            >Terms and Conditions</a>
                            </label>
                        </div>

                        <button
                            className='btn justify-content-center p-2'
                            style={ {
                                background: '#326346',
                                color: '#ffff'
                            } }
                        >Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ObituaryForm