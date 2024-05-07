import express from 'express';
import mysql from 'mysql';
import cors from 'cors';


const app = express();

app.use( cors() );
app.use( express.json() );


const db = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'amarar',
 
} );



//for display data on donations page
app.get("/viewdonation", (req, res) => {
    const q = "SELECT * FROM amarar.donations";
    db.query(q, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(data);
    });
});


// for post donations input data by donation form
app.post("/donations",(req,res)=>{
    console.log("Received donation request:", req.body);
    const q = "INSERT INTO donations (username, email, type, comment) VALUES (?, ?, ?, ? )";
    const values = [
        req.body.username,
        req.body.email,
        req.body.type,
        req.body.comment,
        req.body.date

    ]

    db.query(q,values,(err,data)=>{
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json(err);
        }
        console.log("Insert successful");
        return res.status(200).json({ message: 'Insert successful' });
    });
})

app.get("/donation/:id" ,( req, res ) =>
{

    const sql = "SELECT * FROM donations WHERE ID = ?";

    const id = req.params.id;
    db.query( sql, [ id ], ( err, result ) =>
    {
        if ( err ) return res.json( { Message: "Error inside server" } );
        return res.json( result );
    } );
} )

//obituary
app.get(
    [
        '/read/:id',
        '/readDescription/:id',
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
    } );
} );

app.get("/viewobituary", (req, res) => {
    const q = "SELECT * FROM amarar.obituary";
    db.query(q, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(data);
    });
});

app.get("/viewremembrance", (req, res) => {
    const q = "SELECT * FROM amarar.remembrance";
    db.query(q, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json(data);
    });
});

//Admin login
app.post('/login' , (req , res) => {
    const sql = "SELECT * FROM admin WHERE Username = ? AND Password = ? ";

    db.query(sql , [req.body.email,req.body.password] , (err,data) => {
        if(err) return res.json("Login failed");
        if(data.length > 0){
            return res.json("Login Successfull");
        }else{
            return res.json("No record");
        }

    })
        

    
})


app.listen( 8081, () =>
{
    console.log( "listening on 8081" );
} );