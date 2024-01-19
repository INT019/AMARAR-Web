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
app.get( '/', ( req, res ) =>
{
    const sql = "SELECT * FROM obituary";
    db.query( sql, ( err, result ) =>
    {
        if ( err ) return res.json( { Message: "Error inside server" } );
        return res.json( result );
    } );
} );

// for obituary form
app.post( '/obituary', upload.fields( [ { name: 'images', maxCount: 5 }, { name: 'certificates', maxCount: 1 } ] ), ( req, res ) =>
{
    const sql = "INSERT INTO obituary (`fName`, `lName`, `dob`, `dod`, `country`, `city`, `religion`, `images`, `certificate`, `title`, `donation`, `description`, `userName`, `userEmail`, `contactNo`, `nic`, `createdTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

    const values = [
        req.body.fname,
        req.body.lname,
        req.body.dob,
        req.body.dod,
        req.body.country,
        req.body.city,
        req.body.religion,
        req.files[ 'images' ] ? req.files[ 'images' ][ 0 ].buffer : '',
        req.files[ 'certificates' ] ? req.files[ 'certificates' ][ 0 ].buffer : '',
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
        '/readShare/:id',
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