import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Dropdown } from 'react-bootstrap';
import { Buffer } from 'buffer';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import UserSidebar from '../components/UserSidebar';

// css
import '../styles/UserRemembranceHome.css'

function UserRemembranceHome ()
{
    const [ data, setData ] = useState( [] );

    useEffect( () =>
    {
        axios.get( 'http://localhost:8081/re-fun' )
            .then( res =>
            {
                setData( res.data );
            } )
            .catch( err => console.log( err ) );
    }, [] );

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

    // for delete functionality
    const handleDelete = ( id ) =>
    {
        axios.delete( 'http://localhost:8081/delete-remembrance/' + id )
            .then( res =>
            {
                window.location.reload();
            } )
            .catch( err => console.log( err ) );
    }

    return (
        <div className='remembrance-dashboard' style={ { background: '#F2F2F8' } }>
            <div className="grid-container">
                <div className="grid-item grid-item-1">
                    <Header />
                </div>

                <div className="grid-item grid-item-2">
                    <UserSidebar />
                </div>

                <div className="grid-item grid-item-3">
                    <h2>My Remembrance Posts</h2>
                </div>

                <div className="grid-item grid-item-4">
                    <div className="filter-container">
                        <select className='filter'>
                            <option>Package</option>
                            <option>Basic</option>
                            <option>Standard</option>
                            <option>Premium</option>
                        </select>

                        <select className='filter'>
                            <option>Status</option>
                            <option>Completed</option>
                            <option>Processing</option>
                            <option>Pending</option>
                        </select>
                    </div>
                </div>

                <div className='grid-item grid-item-5'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Title</th>
                                <th>Package</th>
                                <th>Status</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            { Array.isArray( data ) && data.length > 0 ? (
                                data.map( r_post => (
                                    <tr key={ r_post.r_ID }>
                                        <td>
                                            { r_post.r_mainImage && (
                                                <img
                                                    src={ `http://localhost:8081/backend/uploads/images/remembrance/r_mainImage/${ r_post.r_mainImage }` }
                                                    alt="Thumbnail"
                                                    style={ {
                                                        maxWidth: '100px',
                                                        maxHeight: '100px'
                                                    } }
                                                />
                                            ) }
                                        </td>

                                        <td>
                                            <Link
                                                to={ `/read-remembrance/${ r_post.r_ID }` }
                                                style={ {
                                                    textDecoration: 'none',
                                                    color: 'black'
                                                } }
                                            >{ r_post.title }</Link></td>

                                        <td>{ r_post.package }</td>

                                        <td>
                                            {/* <div style={ statusStyle( r_post.status ) }>
                                                     { r_post.status }
                                                 </div> */}
                                            { r_post.status }
                                        </td>

                                        <td>{ timeAgo( r_post.createdTime, r_post.editedTime ) }</td>

                                        <td>
                                            {/* Edit Button */ }
                                            <div className='button-container'>
                                                <button>
                                                    <Link
                                                        to={ `/edit-remembrance/${ r_post.r_ID }` }
                                                        className='btn btn-sm'
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#326346" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg>
                                                    </Link>
                                                </button>
                                            </div>

                                            {/* Delete Button */ }
                                            <div className='button-container'>
                                                <button
                                                    onClick={ () => handleDelete( r_post.r_ID ) }
                                                    className='btn btn-sm'
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#326346" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) )
                            ) : (
                                <p>No data available</p>
                            ) }
                        </tbody>
                    </table>
                </div>

                {/* for navigate to create post page */ }
                <div className='grid-item grid-item-6'>
                    <button className='create-btn'>
                        <Link
                            to="/create-remembrance"
                            style={ {
                                textDecoration: 'none',
                                color: 'white'
                            } }
                        >Create New Post</Link>
                    </button>
                </div>

                <div className="grid-item grid-item-7">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default UserRemembranceHome