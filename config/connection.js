// import sequelize library 
const Sequelize = require('sequelize');

// load environment variables from .env file
require('dotenv').config();
console.log(process.env) // remove this after you've confirmed it is working

// use environment variables in .env to connect to database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  },
  console.log("connected to employee database.")
);

// export sequelize instance as a module
module.exports = sequelize;