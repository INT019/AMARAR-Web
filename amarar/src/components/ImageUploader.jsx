import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react'

function ImageUploader ( { preview, onChange } )
{
    const [ previewOpen, setPreviewOpen ] = useState( false );
    const [ previewImage, setPreviewImage ] = useState( '' );

    const handleCancel = () => setPreviewOpen( false );

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

    const getBase64 = ( file ) =>
        new Promise( ( resolve, reject ) =>
        {
            const reader = new FileReader();
            reader.readAsDataURL( file );
            reader.onload = () => resolve( reader.result );
            reader.onerror = ( error ) => reject( error );
        } );

    return (
        <>
            <Upload
                action={ "http://localhost:8081/backend/uploads/images/Obituary/mainImage" }
                listType="picture-card"
                showUploadList={ { showRemoveIcon: true } }
                accept='.png, .jpeg, .jpg'
                beforeUpload={ ( file ) =>
                {
                    console.log( { file } )
                    return false
                } }
                onChange={ onChange }
                onPreview={ handlePreview }
            >
                { preview ? (
                    <img
                        //src={ `http://localhost:8081/backend/uploads/images/Obituary/mainImage/${ values.mainImage }` }
                        src={ preview }
                        //src={ URL.createObjectURL( uploadedMainImage ) }
                        alt="Main"
                        style={ { width: "100%" } }
                    // condition and table
                    />
                ) : (
                    uploadButton
                ) }
            </Upload>

            {/* <Modal
                open={ previewOpen }
                footer={ null }
                onCancel={ handleCancel }
            >
                <img
                    alt='Preview'
                    style={ { width: '100%' } }
                    src={ previewImage }
                />
            </Modal> */}
        </>
    )
}

export default ImageUploader