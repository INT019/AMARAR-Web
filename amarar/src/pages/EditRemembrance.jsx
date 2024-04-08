import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/EditRemembrance.css';

function EditRemembrance ()
{
    const { id } = useParams();
    const [ isEdit, setIsEdit ] = useState( false );

    const navigate = useNavigate();

    useEffect( () =>
    {
        axios.get( 'http://localhost:8081/read-remembrance/' + id )
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
                    description: res.data[ 0 ].description
                    // name: res.data[ 0 ].userName,
                    // email: res.data[ 0 ].userEmail,
                    // contactNo: res.data[ 0 ].contactNo,
                    // nic: res.data[ 0 ].nic
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
        title: '',
        description: ''
        // name: '',
        // email: '',
        // contactNo: '',
        // nic: ''
    } );

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
        setIsEdit( true );
    };

    const handleEdit = ( event ) =>
    {
        event.preventDefault();
        axios.put( 'http://localhost:8081/edit-remembrance/' + id, values )
            .then( res =>
            {
                console.log( res )
                navigate( '/remembrance-dashboard' )
            } )
            .catch( err => console.log( err ) );
    };

    return (
        <div className='create-remembrance'>
            <div className='header'>
                <Header />
            </div>

            <div className='edit-remembrance-inner'>
                <p className='edit-remembrance-title'>EDIT YOUR REMEMBRANCE ....</p>

                <div className='edit-remembrance-form-container'>
                    <form onSubmit={ handleEdit }>

                        {/* for personal information */ }
                        <div className='edit-remembrance-form-section'>
                            <p className='edit-remembrance-form-heading'>Person's Information</p>

                            <div className='edit-remembrance-form-row'>
                                <div className='edit-remembrance-form-row-inner'>
                                    <label htmlFor='fname'>First Name  :</label>
                                    <input
                                        type='text'
                                        placeholder='John'
                                        className='form-control'
                                        onChange={ e => setValues( { ...values, fname: e.target.value } ) }
                                        value={ values.fname }
                                        required
                                    />
                                </div>

                                <div className='edit-remembrance-form-row-inner'>
                                    <label htmlFor='lname'>Last Name  :</label>
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

                            <div className='edit-remembrance-form-row'>
                                <div className='edit-remembrance-form-row-inner'>
                                    <label htmlFor='dob'>Date of Birth  :</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        onChange={ e => setValues( { ...values, dob: e.target.value } ) }
                                        value={ values.dob }
                                        required
                                    />
                                </div>

                                <div className='edit-remembrance-form-row-inner'>
                                    <label htmlFor='dod'>Date of Death  :</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        onChange={ e => setValues( { ...values, dod: e.target.value } ) }
                                        value={ values.dod }
                                        required
                                    />
                                </div>
                            </div>

                            <div className='edit-remembrance-form-row'>
                                <div className='edit-remembrance-form-row-inner'>
                                    <label htmlFor='country'>Country  :</label>
                                    <input
                                        type='text'
                                        placeholder='Sri Lanka'
                                        className='form-control'
                                        onChange={ e => setValues( { ...values, country: e.target.value } ) }
                                        value={ values.country }
                                        required
                                    />
                                </div>

                                <div className='edit-remembrance-form-row-inner'>
                                    <label htmlFor='city'>City  :</label>
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

                            <div className='edit-remembrance-form-row'>
                                <div className='edit-remembrance-form-row-inner-religion'>
                                    <label htmlFor='religion'>Religion  :</label>
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
                        </div>


                        {/* for more information */ }
                        <div className='edit-remembrance-form-section'>
                            <p className='edit-remembrance-form-heading'>More Information</p>

                            <div className='edit-remembrance-form-row-more'>
                                <label htmlFor='title' className='col-sm-2'>Title:</label>
                                <div className='create-remembrance-form-moreInfo-input'>
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

                            <div className='edit-remembrance-form-row-more'>
                                <label htmlFor='description' className='col-sm-2'>Description:</label>

                                <div className='create-remembrance-form-moreInfo-input'>
                                    <ReactQuill
                                        className='ql-editor'
                                        theme='snow'
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
                                    value={ values.description }
                                    required
                                ></textarea> */}
                                </div>
                            </div>
                        </div>

                        {/* for user information */ }

                        {/* <h2>Your Contact Details</h2>
                        <div className='row'>
                            <div className='edit-remembrance-form-row-inner'>
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
                            <div className='edit-remembrance-form-row-inner'>
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
                            <div className='edit-remembrance-form-row-inner'>
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
                            <div className='edit-remembrance-form-row-inner'>
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
                        </div> */}

                        <div className='edit-remembrance-btns'>
                            <button className='edit-remembrance-back-btn'>Back</button>
                            <button className='edit-remembrance-btn'>Save</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
}
export default EditRemembrance