import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();

app.use( cors() );
app.use( express.json() );

// for access images to display
app.use( '/backend/uploads', express.static( 'uploads' ) );

// for image and file upload
const storage = multer.diskStorage( {
    destination: function ( req, file, cb )
    {
        if ( file.fieldname === 'images' )
        {
            cb( null, 'uploads/images/Obituary' );
        } else if ( file.fieldname === 'certificate' )
        {
            cb( null, 'uploads/docs/Obituary' );
        }
    },
    filename: function ( req, file, cb )
    {
        cb( null, file.fieldname + "_" + Date.now() + path.extname( file.originalname ) );
    }
} );

// const storage = multer.diskStorage( {
//     destination: function ( req, file, cb )
//     {
//         cb( null, 'uploads/images/Obituary' )
//     },
//     filename: function ( req, file, cb )
//     {
//         cb( null, file.fieldname + "_" + Date.now() + path.extname( file.originalname ) )
//     }
// } )

const upload = multer( {
    storage: storage
} );

// database connection
const db = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'amarar'
} );

// for display data on user dashboard page
app.get( '/', ( req, res ) =>
{
    const sql = "SELECT * FROM obituary";
    db.query( sql, ( err, result ) =>
    {
        if ( err ) return res.json( { Message: "Error inside server" } );
        return res.json( result );
    } );
} );

// app.get( '/', ( req, res ) =>
// {
//     const sql = "SELECT ID, title, package, status, createdTime, editedTime, CONCAT('http://localhost:8081/uploads/images/obituary/', images) as imageUrl FROM obituary";
//     db.query( sql, ( err, result ) =>
//     {
//         if ( err ) return res.json( { Message: "Error inside server" } );
//         return res.json( result );
//     } );
// } );

// for obituary form
app.post( '/obituary',
    upload.fields( [
        { name: 'images', maxCount: 1 },
        { name: 'certificate', maxCount: 1 } ] )
    , ( req, res ) =>
    {
        console.log( req.files );
        // const images = req.file.filename;
        // const certificate = req.file.filename;

        // const images = req.files[ 'images' ] ? req.files[ 'images' ][ 0 ].filename : '';
        // const certificate = req.files[ 'certificate' ] ? req.files[ 'certificate' ][ 0 ].filename : '';

        const sql = "INSERT INTO obituary (`fName`, `lName`, `dob`, `dod`, `country`, `city`, `religion`, `images`, `certificate`, `title`, `donation`, `description`, `userName`, `userEmail`, `contactNo`, `nic`, `createdTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

        const values = [
            req.body.fname,
            req.body.lname,
            req.body.dob,
            req.body.dod,
            req.body.country,
            req.body.city,
            req.body.religion,
            // req.files[ 'images' ] ? req.files[ 'images' ][ 0 ].buffer : '',
            req.files[ 'images' ] ? req.files[ 'images' ][ 0 ].filename : '',
            // req.files[ 'certificate' ] ? req.files[ 'certificate' ][ 0 ].buffer : '',
            req.files[ 'certificate' ] ? req.files[ 'certificate' ][ 0 ].filename : '',
            req.body.title,
            req.body.donation,
            req.body.description,
            req.body.name,
            req.body.email,
            req.body.contactNo,
            req.body.nic
        ];

        db.query( sql, values, ( err, result ) =>
        {
            if ( err )
            {
                console.error( 'Error executing query:', err );
                return res.json( err );
            }

            return res.json( result );
        } );
    } );

// for display data on obituary view post page

// Description
app.get(
    [
        '/read/:id',
        // '/readDescription/:id',
        '/readPhotos/:id',
        //'/readShare/:id',
        '/readTribute/:id',
    ], ( req, res ) =>
{
    const sql = "SELECT * FROM obituary WHERE ID = ?";

    const id = req.params.id;
    db.query( sql, [ id ], ( err, result ) =>
    {
        if ( err ) return res.json( { Message: "Error inside server" } );
        return res.json( result );
    } );
} );

// donation (Kavishka)
app.get( "/readDonation/:id", ( req, res ) =>
{
    const q = "SELECT * FROM donations";
    db.query( q, ( err, data ) =>
    {
        if ( err )
        {
            console.error( err );
            return res.status( 500 ).json( { error: 'Internal Server Error' } );
        }
        return res.status( 200 ).json( data );
    } );
} );

// for edit form
app.put( '/edit/:id', ( req, res ) =>
{
    const sql = 'UPDATE obituary SET `fName` =?, `lName` =?, `dob` =?, `dod` =?, `country` =?, `city` =?, `religion` =?, `title` =?, `donation` =?, `description` =?, `editedTime` =NOW() WHERE ID = ?';

    const id = req.params.id;
    db.query( sql, [
        req.body.fname,
        req.body.lname,
        req.body.dob,
        req.body.dod,
        req.body.country,
        req.body.city,
        req.body.religion,
        req.body.title,
        req.body.donation,
        req.body.description,
        // req.body.name,
        // req.body.email,
        // req.body.contactNo,
        // req.body.nic,
        id ], ( err, result ) =>
    {
        if ( err ) return res.json( { Message: "Error inside server" } );
        return res.json( result );
    } )
} );

// for delete post
app.delete( '/delete/:id', ( req, res ) =>
{
    const sql = "DELETE FROM obituary WHERE ID = ?";

    const id = req.params.id;
    db.query( sql, [ id ], ( err, result ) =>
    {
        if ( err ) return res.json( { Message: "Error inside server" } );
        return res.json( result );
    } )
} );

app.listen( 8081, () =>
{
    console.log( "listening on 8081" );
} );