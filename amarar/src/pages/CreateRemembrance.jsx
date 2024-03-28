import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Upload, Button, Modal } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

function CreateRemembrance ()
{
    const [ values, setValues ] = useState( {
        fname: '',
        lname: '',
        dob: '',
        dod: '',
        country: '',
        city: '',
        religion: '',
        mainImage: '',
        title: '',
        description: '',
        name: '',
        email: '',
        contactNo: '',
        nic: ''
    } );

    const navigate = useNavigate();

    // for country
    // const handleCountry = ( country ) =>
    // {
    //     setValues( {
    //         ...values,
    //         country
    //     } );
    // };

    // for city
    // const handleCity = ( city ) =>
    // {
    //     setValues( {
    //         ...values,
    //         city
    //     } );
    // };

    // for image uploading
    //type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[ 0 ];

    const getBase64 = ( file ) =>
        new Promise( ( resolve, reject ) =>
        {
            const reader = new FileReader();
            reader.readAsDataURL( file );
            reader.onload = () => resolve( reader.result );
            reader.onerror = ( error ) => reject( error );
        } );


    const [ previewOpen, setPreviewOpen ] = useState( false );
    const [ previewImage, setPreviewImage ] = useState( '' );

    // Function to handle closing of preview modal
    const handleCancel = () => setPreviewOpen( false );

    // Function to handle viewing of preview modal
    const handlePreview = ( file ) =>
    {
        const previewFile = async () =>
        {
            if ( !file.url && !file.preview )
            {
                file.preview = await getBase64( file.originFileObj );
            }

            setPreviewImage( file.url || file.preview );
            setPreviewOpen( true );
        };

        previewFile();
    };

    // Upload button
    const uploadButton = (
        <button
            style={ {
                border: 0,
                background: 'none',
            } }
            type='button'
        >
            <PlusOutlined />
            <div
                className='ant-upload-text'
                style={ { margin: 8 } }>Upload</div>
        </button>
    );

    // for handle main image uploading
    const handleImages = ( info ) =>
    {
        if ( info.file )
        {
            const file = info.file;

            setValues( {
                ...values,
                mainImage: file,
            } )
        }
    };

    // const handleImages = ( info ) =>
    // {
    //     if ( info.fileList && info.fileList.length > 0 )
    //     {
    //         const file = info.fileList[ 0 ].originFileObj;
    //         setValues( {
    //             ...values,
    //             mainImage: file,
    //         } );
    //     }
    // };

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

        axios.post( 'http://localhost:8081/remembrance', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        } )
            .then( res =>
            {
                console.log( res );
                navigate( '/remembrance-dashboard' );
            } )
            .catch( err => console.log( err ) );
    };

    return (
        <div>
            <div className='d-flex flex-column justify-content-center align-items-center' style={ { background: '#F2F2F8' } }>
                <h1>CREATE YOUR REMEMBRANCE ....</h1>

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

                                {/* <CountryCityField
                                    onCountryChange={ handleCountry }
                                    onCityChange={ handleCity }
                                /> */}
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
                            {/* for post image */ }
                            <div className='form-group col-md-6'>
                                <label htmlFor='mainImage'>
                                    Main Image For Post:
                                </label>
                                {/* <input
                                    type='file'
                                    className='form-control'
                                    onChange={ handleImages }
                                /> */}

                                <Upload
                                    action={ "http://localhost:8081/backend/uploads/images/remembrance/mainImage" }
                                    onChange={ handleImages }
                                    onPreview={ handlePreview }
                                    listType="picture-card"
                                    showUploadList={ { showRemoveIcon: true } }
                                    accept='.png, .jpeg, .jpg'
                                    beforeUpload={ ( file ) =>
                                    {
                                        console.log( { file } )
                                        return false
                                    } }
                                >
                                    { values.mainImage ? null : uploadButton }
                                </Upload>

                                <Modal
                                    open={ previewOpen }
                                    footer={ null }
                                    onCancel={ handleCancel }
                                >
                                    <img
                                        alt='Preview'
                                        style={ { width: '100%' } }
                                        src={ previewImage }
                                    />
                                </Modal>
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
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-group row p-2'>
                            <label htmlFor='description' className='col-sm-2'>Description:</label>

                            <div
                                className='col-sm-10'
                            >
                                <ReactQuill
                                    theme='snow'
                                    style={ {
                                        height: '300px',
                                        background: '#fff',
                                        borderRadius: '10px'
                                    } }
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

export default CreateRemembrance