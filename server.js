// import our dependencies
const express = require("express");
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

// cors and ejs

// configuring the environment variable
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


// testing the connection
db.connect((err) => {
    // If the connection is successful
    if(err) {
        console.log("Error connecting to mysql db:", err);
    }
    // If connection is not successful
    console.log("Successfully connected to mysql as id:", db.threadId);
})

// 1. Retrieve all patients
app.get('/patients', (req,res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        // If an error occur
        if(err) {
            return res.status(400).send("failed to fetch patients", err)
        }

        // if successful
        res.status(200).send(data)
    })
})

// 2. Retrieve all providers
app.get('/providers', (req,res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        // if it fails to get providers
        if(err) {
            return res.status(400).send("Error getting providers", err)
        }

        // if successful
        res.status(200).send(data)
    })
})

// 3. Filter patients by First Name
app.get('/patients/:first_name', (req,res) => {
    const getProviders = "SELECT first_name FROM providers"
    db.query(getProviders, (err, data) => {
        // if it fails to get providers
        if(err) {
            return res.status(400).send("Error getting providers", err)
        }

        // if successful
        res.status(200).send(data)
    })
})

// 4. Retrieve all providers by their specialty
app.get('/providers/:provider_specialty', (req,res) => {
    const getProviders = "SELECT provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        // if it fails to get providers
        if(err) {
            return res.status(400).send("Error getting providers", err)
        }

        // if successful
        res.status(200).send(data)
    })
})

// start and listen to the server
app.listen(3300, () => {
    console.log(`Server is running on port 3300...`)
})