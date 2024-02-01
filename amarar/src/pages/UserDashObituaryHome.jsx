import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Dropdown } from 'react-bootstrap';
import { Buffer } from 'buffer';

function UserDashObituaryHome ()
{
    const [ data, setData ] = useState( [] );

    useEffect( () =>
    {
        axios.get( 'http://localhost:8081/' )
            .then( res =>
            {
                setData( res.data );
            } )
            .catch( err => console.log( err ) );
    }, [] );

    // status
    // const statusStyle = ( statusOption ) =>
    // {
    //     switch ( statusOption.toLowerCase() )
    //     {
    //         case 'completed':
    //             return { color: '#24A148', backgroundColor: 'rgba(36, 161, 72, 0.30)', borderRadius: '20px', padding: '8px' };

    //         case 'processing':
    //             return { color: '#F1C21B', backgroundColor: 'rgba(241, 194, 27, 0.30)', borderRadius: '20px', padding: '8px' };

    //         case 'pending':
    //             return { color: '#DA1E28', backgroundColor: 'rgba(218, 30, 40, 0.30)', borderRadius: '20px', padding: '8px' };

    //         default:
    //             return {};
    //     }
    // };

    // for time
    const timeAgo = ( createdTime, editedTime ) =>
    {
        const now = new Date();

        if ( editedTime && editedTime !== createdTime )
        {
            const distanceToNow = formatDistanceToNow( new Date( editedTime ), { addSuffix: true, includeSeconds: true } );
            return `Edited ${ distanceToNow.replace( 'about', '' ) }`;
        } else
        {
            const distanceToNow = formatDistanceToNow( new Date( createdTime ), { addSuffix: true, includeSeconds: true } );
            return `${ distanceToNow.replace( 'about', '' ) }`;
        }
    };

    const handleDelete = ( id ) =>
    {
        axios.delete( 'http://localhost:8081/delete/' + id )
            .then( res =>
            {
                window.location.reload();
            } )
            .catch( err => console.log( err ) );
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center' style={ { background: '#F2F2F8' } }>
            <div className='w-50 p-3'>

                <h2>My Obituary Posts</h2>

                {/* for filters */ }
                <div className='d-flex justify-content-end p-3'>

                    {/* Dropdown for Packages */ }
                    {/* <Dropdown>
                        <Dropdown.Toggle data-bs-toggle="dropdown" aria-expanded="false" variant="light" id="packageDropdown">Package</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#pack1">Basic</Dropdown.Item>
                            <Dropdown.Item href="#pack2">Standard</Dropdown.Item>
                            <Dropdown.Item href="#pack3">Premium</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}

                    <select id='packageDropdown'>
                        <option>Package</option>
                        <option>Basic</option>
                        <option>Standard</option>
                        <option>Premium</option>
                    </select>

                    {/* Dropdown for Status */ }
                    {/* <Dropdown>
                        <Dropdown.Toggle variant="light" id="statusDropdown">Status</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#status1">Completed</Dropdown.Item>
                            <Dropdown.Item href="#status2">Processing</Dropdown.Item>
                            <Dropdown.Item href="#status3">Pending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}

                    <select id='statusDropdown'>
                        <option>Status</option>
                        <option>Completed</option>
                        <option>Processing</option>
                        <option>Pending</option>
                    </select>
                </div>

                <table className='table  rounded'>
                    <thead>
                        <tr>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Package</th>
                            <th>Status</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        { Array.isArray( data ) && data.length > 0 ? (
                            data.map( post => (
                                <tr key={ post.ID }>
                                    <td>
                                        { post.mainImage && (
                                            <img
                                                src={ `http://localhost:8081/backend/uploads/images/Obituary/mainImage/${ post.mainImage }` }
                                                alt="Thumbnail"
                                                style={ {
                                                    maxWidth: '100px',
                                                    maxHeight: '100px'
                                                } }
                                            />
                                        ) }
                                    </td>

                                    {/* <td>
                                        <img src={ post.mainImage } alt="Thumbnail" />
                                    </td> */}

                                    <td>
                                        <Link to={ `/read/${ post.ID }` }>{ post.title }</Link></td>

                                    <td>{ post.package }</td>

                                    <td>
                                        {/* <div style={ statusStyle( post.status ) }>
                                        { post.status }
                                    </div> */}
                                        { post.status }
                                    </td>

                                    <td>{ timeAgo( post.createdTime, post.editedTime ) }</td>

                                    <td>
                                        {/* Edit Button */ }
                                        <Link to={ `/edit/${ post.ID }` } className='btn btn-sm'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#326346" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg>

                                        </Link>

                                        {/* Delete Button */ }
                                        <button onClick={ () => handleDelete( post.ID ) } className='btn btn-sm'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#326346" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ) )
                        ) : (
                            <p>No data available</p>
                        ) }
                    </tbody>
                </table>

                {/* for navigate to create post page */ }
                <div className='d-flex justify-content-end'>
                    <Link to="/create" className='btn btn-success'>Create New Post</Link>
                </div>
            </div>
        </div>
    )
}

export default UserDashObituaryHome