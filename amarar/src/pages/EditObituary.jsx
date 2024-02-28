import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Upload, Button, Modal } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

function EditObituary ()
{
    const { id } = useParams();
    const navigate = useNavigate();

    const [ isEdited, setIsEdited ] = useState( false );

    useEffect( () =>
    {
        axios.get( 'http://localhost:8081/read/' + id )
            .then( res =>
            {
                console.log( res );
                console.log( res.data );

                setValues( {
                    ...values,
                    fname: res.data[ 0 ].fName,
                    lname: res.data[ 0 ].lName,
                    dob: new Date( res.data[ 0 ].dob ).toISOString().split( 'T' )[ 0 ],
                    dod: new Date( res.data[ 0 ].dod ).toISOString().split( 'T' )[ 0 ],
                    country: res.data[ 0 ].country,
                    city: res.data[ 0 ].city,
                    religion: res.data[ 0 ].religion,
                    mainImage: res.data[ 0 ].mainImage,
                    otherImages: JSON.parse( res.data[ 0 ].otherImages ),
                    certificates: res.data[ 0 ].certificates,
                    title: res.data[ 0 ].title,
                    donation: res.data[ 0 ].donation,
                    description: res.data[ 0 ].description,
                    name: res.data[ 0 ].userName,
                    email: res.data[ 0 ].userEmail,
                    contactNo: res.data[ 0 ].contactNo,
                    nic: res.data[ 0 ].nic
                } );

                setIsEdited( false );
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
        mainImage: '',
        otherImages: [],
        certificates: null,
        title: '',
        donation: '',
        description: '',
        name: '',
        email: '',
        contactNo: '',
        nic: ''
    } );

    // to handle image uploading
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
    // Replace your existing handleImages function with the provided one
    // To handle main image uploading
    const handleImages = ( info ) =>
    {
        if ( info.fileList && info.fileList.length > 0 )
        {
            const file = info.fileList[ 0 ].originFileObj;
            setValues( {
                ...values,
                mainImage: file,
            } );
        } else
        {
            setValues( {
                ...values,
                mainImage: '',
            } )
        }
        setIsEdited( true );
    };

    // Update handleImages function to display already uploaded main image
    // const handleImages = ( info ) =>
    // {
    //     if ( info.fileList && info.fileList.length > 0 )
    //     {
    //         const file = info.fileList[ 0 ].originFileObj;

    //         const imageUrl = URL.createObjectURL( file );
    //         console.log( "Image URL:", imageUrl );

    //         setValues( {
    //             ...values,
    //             mainImage: URL.createObjectURL( file ),
    //         } );
    //     } else
    //     {
    //         setValues( {
    //             ...values,
    //             mainImage: values.mainImage,
    //         } );
    //     }

    //     setIsEdited( true );
    // };


    // for handle other images
    const handleOtherImages = ( info ) =>
    {
        if ( info.fileList && info.fileList.length > 0 )
        {
            const files = info.fileList.map( file => file.originFileObj );
            setValues( {
                ...values,
                otherImages: files,
            } );
        }

        //const files = info.fileList.map( file => file.originFileObj );
        //setUploadedOtherImages( files );

        setIsEdited( true );
    };

    // handle certificate upload
    const handleCertification = ( info ) =>
    {
        if ( info.fileList && info.fileList.length > 0 )
        {
            const file = info.fileList[ 0 ].originFileObj;
            setValues( {
                ...values,
                certificate: file,
            } );
        }

        //setUploadedCertificate( info.fileList[ 0 ].originFileObj );
        setIsEdited( true );
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
        setIsEdited( true );
    };

    const handleEdit = ( event ) =>
    {
        event.preventDefault();

        const formData = new FormData();
        Object.entries( values ).forEach( ( [ key, value ] ) =>
        {
            if ( key === 'otherImages' )
            {
                for ( let i = 0; i <= value.length; i++ )
                {
                    formData.append( 'otherImages', value[ i ] );
                }
            } else
            {
                formData.append( key, value );
            }
        } );

        // check if a new main image has been uploaded
        if ( values.mainImage instanceof File )
        {
            formData.append( 'mainImage', values.mainImage );
        }

        axios.put( 'http://localhost:8081/edit/' + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        } )
            .then( res =>
            {
                console.log( res )
                navigate( '/obituary-dashboard' )
            } )

            .catch( err => console.log( err ) );
    };

    return (
        <div>
            <div className='d-flex flex-column justify-content-center align-items-center' style={ { background: '#F2F2F8' } }>
                <h1>EDIT YOUR OBITUARY ....</h1>

                <div className='w-50 rounded p-4' style={ { background: '#D9D9D9' } }>
                    <form
                        onSubmit={ handleEdit }
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
                                <label htmlFor='mainImage'>Images:</label>
                                {/* <input
                                    type='file'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, images: e.target.value } ) }
                                    value={ values.images }
                                /> */}

                                <Upload
                                    action={ "http://localhost:8081/backend/uploads/images/Obituary/mainImage" }
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
                                    { values.mainImage ? (
                                        <img
                                            //src={ `http://localhost:8081/backend/uploads/images/Obituary/mainImage/${ values.mainImage }` }
                                            src={ values.mainImage }
                                            //src={ URL.createObjectURL( uploadedMainImage ) }
                                            alt="Main"
                                            style={ { width: "100%" } }
                                        // condition and table
                                        />
                                    ) : (
                                        uploadButton
                                    ) }
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

                            <div className='form-group col-md-6'>
                                <label htmlFor='otherImages'>Other Images:</label>
                                {/* <input
                                    type='file'
                                    className='form-control'
                                    onChange={ handleOtherImages }
                                    multiple
                                /> */}

                                <Upload
                                    action={ "http://localhost:8081/backend/uploads/images/Obituary/otherImages" }
                                    onChange={ handleOtherImages }
                                    onPreview={ handlePreview }
                                    listType="picture-card"
                                    showUploadList={ { showRemoveIcon: true } }
                                    accept='.png, .jpeg, .jpg'
                                    beforeUpload={ ( file ) =>
                                    {
                                        console.log( { file } );
                                        return false;
                                    } }
                                    multiple
                                >
                                    { values.otherImages.map( ( image, index ) => (
                                        <img
                                            key={ index }
                                            //src={ `http://localhost:8081/backend/uploads/images/Obituary/otherImages/${ image }` }
                                            src={ image }
                                            //src={ URL.createObjectURL( image ) }
                                            alt={ `Other ${ index }` }
                                            style={ {
                                                width: '100%'
                                            } }
                                        />
                                    ) ) }
                                    { uploadButton }
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

                            <div className='form-group col-md-6'>
                                <label htmlFor='certificates'>Certificate of Death:</label>
                                {/* <input
                                    type='file'
                                    className='form-control'
                                    onChange={ e => setValues( { ...values, certificates: e.target.value } ) }
                                    value={ values.certificates }
                                /> */}
                                <Upload
                                    action={ "http://localhost:8081/backend/uploads/docs/Obituary" }
                                    onChange={ handleCertification }
                                    listType="text"
                                    showUploadList={ { showRemoveIcon: true } }
                                    accept='.pdf, .docx'
                                    beforeUpload={ ( file ) =>
                                    {
                                        console.log( { file } )
                                        return false
                                    } }

                                >
                                    { values.certificates ? <p>{ values.certificates }</p> : (
                                        <div>
                                            <p>Drag File here OR</p>
                                            <Button icon={ <UploadOutlined /> }></Button>
                                        </div>
                                    ) }
                                </Upload>
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
                                    value={ values.description }
                                    required
                                ></textarea> */}
                            </div>
                        </div>

                        {/* for user information */ }

                        {/* <h2>Your Contact Details</h2>

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
                        </div> */}

                        <button
                            className='btn justify-content-center p-2'
                            style={ {
                                background: '#326346',
                                color: '#ffff'
                            } }>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditObituary