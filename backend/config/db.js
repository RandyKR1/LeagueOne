const { Client } = require('pg');  // Import the pg client for PostgreSQL
const { getDatabaseUri } = require('./dbUtils');  // Import the getDatabaseUri function from the config module
const { Sequelize } = require('sequelize');  // Import Sequelize for ORM

const sequelize = new Sequelize(getDatabaseUri(), {
  dialect: 'postgres',  // Specify the dialect for the database
  logging: true  // Enable logging for Sequelize
});

console.log("Database URI:", getDatabaseUri());
// console.log("Loaded ENV values:");
// console.log("Username:", process.env.DB_USERNAME);
// console.log("Password:", process.env.DB_PASSWORD);
// console.log("Host:", process.env.DB_HOST);
// console.log("Database:", process.env.DB_NAME);


module.exports = {
  sequelize  
};
