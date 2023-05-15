// import mysql module 
const mysql = require('mysql2');
// load environment variables from .env file
require('dotenv').config();
// console.log(process.env);

// use environment variables in .env to connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    });
  
    connection.connect((err) => {
        if (err) {
        console.error('Error connecting to database: ', err);
        return;
        }
    console.log('\nConnected to employee database.');
});

// export mysql connection instance as a module for use in other files
module.exports = connection;