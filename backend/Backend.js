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
        } else if ( file.fieldname === 'otherImages' )
        {
            cb( null, 'uploads/images/remembrance/otherImages' );
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
    upload.fields( [
        { name: 'mainImage', maxCount: 1 },
        { name: 'otherImages', maxCount: 5 } ] )
    , ( req, res ) =>
    {
        console.log( req.files );
        // const mainImage = req.file.filename;
        // const certificate = req.file.filename;

        const otherImagesArray = req.files[ 'otherImages' ];
        const otherImages = otherImagesArray ? ( Array.isArray( otherImagesArray ) ? otherImagesArray.map( file => file.filename ) : [ otherImagesArray.filename ] ) : [];

        // const mainImage = req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].filename : '';
        // const certificate = req.files[ 'certificate' ] ? req.files[ 'certificate' ][ 0 ].filename : '';

        const sql = "INSERT INTO remembrance (`fName`, `lName`, `dob`, `dod`, `country`, `city`, `religion`, `mainImage`, `otherImages`, `title`, `donation`, `description`, `userName`, `userEmail`, `contactNo`, `nic`, `createdTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

        const values = [
            req.body.fname,
            req.body.lname,
            req.body.dob,
            req.body.dod,
            req.body.country,
            req.body.city,
            req.body.religion,
            req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].filename : '',
            // req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].buffer : '',
            JSON.stringify( otherImages ),
            //JSON.stringify( req.files[ 'otherImages' ] ? req.files[ 'otherImages' ].map( file => file.filename ) : [] ),
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

// --- Description


// --- Donation (Kavishka)


// for edit form


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