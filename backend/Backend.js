import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';

const app = express();

app.use( cors() );
app.use( express.json() );

const storage = multer.memoryStorage();
const upload = multer( { storage: storage } );

// database connection
const db = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'amarar'
} );

// for display data on user dashboard page


// for post user input data by obituary form


// for display data on obituary detail page


// for edit form data


// for delete function


app.listen( 8081, () =>
{
    console.log( "listening on 8081" );
} );