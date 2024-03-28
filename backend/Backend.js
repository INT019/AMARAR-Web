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
        if ( file.fieldname === 'mainImage' )
        {
            cb( null, 'uploads/images/remembrance/mainImage' );
        }
    },
    filename: function ( req, file, cb )
    {
        cb( null, file.fieldname + "_" + Date.now() + path.extname( file.originalname ) );
    }
} );

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
    const sql = "SELECT * FROM remembrance";
    db.query( sql, ( err, result ) =>
    {
        if ( err ) return res.json( { Message: "Error inside server" } );
        return res.json( result );
    } );
} );

// for remembrance form
app.post( '/remembrance',
    upload.single( 'mainImage' ),
    ( req, res ) =>
    {
        console.log( req.file );

        const sql = "INSERT INTO remembrance (`fName`, `lName`, `dob`, `dod`, `country`, `city`, `religion`, `mainImage`, `title`, `description`, `userName`, `userEmail`, `contactNo`, `nic`, `createdTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

        const values = [
            req.body.fname,
            req.body.lname,
            req.body.dob,
            req.body.dod,
            req.body.country,
            req.body.city,
            req.body.religion,
            req.file ? req.file.filename : '',
            //req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].filename : '',
            // req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].buffer : '',
            req.body.title,
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

// for display data on remembrance view post page

// --- Description
app.get( [
    '/read-remembrance/:id',
    '/readTribute-remembrance/:id',
], ( req, res ) =>
{
    const sql = "SELECT * FROM remembrance WHERE r_ID = ?";

    const id = req.params.id;

    db.query( sql, [ id ], ( err, result ) =>
    {
        if ( err ) return res.json( { Message: "Error inside server" } );
        return res.json( result );
    } );
} );


// for edit form
app.put( '/edit-remembrance/:id', ( req, res ) =>
{
    console.log( req.file );

    const sql = 'UPDATE remembrance SET `fName` =?, `lName` =?, `dob` =?, `dod` =?, `country` =?, `city` =?, `religion` =?, `title` =?, `description` =?, `editedTime` =NOW() WHERE r_ID = ?';

    const id = req.params.id;
    db.query( sql, [
        req.body.fname,
        req.body.lname,
        req.body.dob,
        req.body.dod,
        req.body.country,
        req.body.city,
        req.body.religion,
        // req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].filename : '',
        // JSON.stringify( otherImages ),
        // req.files[ 'certificate' ] ? req.files[ 'certificate' ][ 0 ].filename : '',
        req.body.title,
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
    const sql = "DELETE FROM remembrance WHERE r_ID = ?";

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