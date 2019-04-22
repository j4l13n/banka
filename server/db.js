const { Pool } = require('pg');
const dotenv = require('dotenv');
const config = require('./config/config');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || config.dbUrl
});

pool.on('connect', () =>{
    console.log('connection to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
    const queryText = 
        `
        CREATE TABLE IF NOT EXISTS
        users(
            id UUID PRIMARY KEY,
            firstname VARCHAR(128) NOT NULL,
            lastname VARCHAR(128) NOT NULL,
            email VARCHAR(200) NOT NULL,
            password VARCHAR(128) NOT NULL,
            type VARCHAR(50) NOT NULL,
            isAdmin BOOLEAN NOT NULL,
            created_date TIMESTAMP,
            modified_date TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS
        accounts(
            id UUID PRIMARY KEY,
            accountNumber VARCHAR(150) NOT NULL,
            createOn TIMESTAMP,
            owner UUID REFERENCES users(id) ON DELETE CASCADE,
            type VARCHAR(40) NOT NULL,
            status VARCHAR(40) NOT NULL,
            balance INT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS
          transactions(
            id UUID PRIMARY KEY,
            createOn TIMESTAMP,
            type VARCHAR(30) NOT NULL,
            accountNumber VARCHAR(200) NOT NULL,
            cashier UUID REFERENCES users(id) ON DELETE CASCADE,
            amount INT NOT NULL,
            oldBalance INT NOT NULL,
            newBalancee INT NOT NULL
          );
        `;
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Drop Tables
 */
const dropTables = () => {
    const queryText = 'DROP TABLE IF EXISTS users';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on('remove', () => {
    console.log('client removed');
});

module.exports = {
    createTables,
    dropTables
};

require('make-runnable');