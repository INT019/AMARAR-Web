const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mysql = require('mysql2');
const randomstring = require('randomstring'); // Import randomstring library for OTP generation
const port = 3000;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => { res.setHeader("Access-Control-Allow-Origin", "*"); next(); });
app.use(bodyParser.json());

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables to access email and password securely
      pass: process.env.EMAIL_PASS, // Make sure to set these environment variables in your server environment
    },
});

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = randomstring.generate(6); // Generate a 6-digit OTP

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for verification',
        text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error('Error sending OTP:', error);
            res.status(500).json({ message: 'Failed to send OTP.' });
        } else {
            console.log('OTP sent successfully:', otp);
            res.status(200).json({ message: 'OTP sent successfully.' });
        }
    });
});

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "amarar",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

app.post('/signup', async (req, res) => {
    const sql = "INSERT INTO user (firstname, lastname, email, contact, username, password) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.contact,
        req.body.username,
        req.body.password
    ];

    try {
        const [rows, fields] = await promisePool.query(sql, values);
        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.json('Error');
    }
});

app.post('/login', async (req, res) => {
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    const values = [
        req.body.username,
        req.body.password
    ];

    try {
        const [rows, fields] = await promisePool.query(sql, values);
        if (rows.length > 0) {
            return res.json({ success: true });
        } else {
            return res.json({ success: false });
        }
    } catch (err) {
        console.error(err);
        return res.json({ success: false });
    }
});

// Facebook login endpoint
app.get('/auth/facebook', (req, res) => {
  const { client_id, redirect_uri, scope } = req.query;
  const authorizationUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
  res.redirect(authorizationUrl);
});

// Instagram login endpoint
app.get('/auth/instagram', (req, res) => {
  const { client_id, redirect_uri, scope } = req.query;
  const authorizationUrl = `https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code`;
  res.redirect(authorizationUrl);
});

// Google login endpoint
app.get('/auth/google', (req, res) => {
  const { client_id, redirect_uri, scope } = req.query;
  const authorizationUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code`;
  res.redirect(authorizationUrl);
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
