import pg, { Pool } from 'pg';
import dotenv from 'dotenv';
import config from './../config/config'
import moment from 'moment';
import crypto from 'crypto';

dotenv.config();

let poolOptions = {
    connectionString: process.env.NODE_ENV === "test" ? config.testDbUrl : config.dbUrl 
}

/**
 * Db class is create for the initialization
 * of the database by creating tables, admin
 * for the firsttime you run the software 
 */

class Db {
    constructor() {
        this.pool = new Pool(poolOptions);
        this.connect = async () => await this.pool.connect();

        this.usersTable = `
        CREATE TABLE IF NOT EXISTS
        users(
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(128) NOT NULL,
            lastname VARCHAR(128) NOT NULL,
            email VARCHAR(200) NOT NULL,
            password VARCHAR(128) NOT NULL,
            type VARCHAR(50) NOT NULL,
            isAdmin BOOLEAN NOT NULL,
            created_date TIMESTAMP,
            modified_date TIMESTAMP,
            salt VARCHAR(100) NOT NULL
        )`;

        this.accountsTable = `
        CREATE TABLE IF NOT EXISTS
        accounts(
            id SERIAL PRIMARY KEY,
            accountNumber BIGINT UNIQUE NOT NULL,
            createOn TIMESTAMP,
            owner SERIAL REFERENCES users(id) ON DELETE CASCADE,
            type VARCHAR(40) NOT NULL,
            status VARCHAR(40) NOT NULL,
            balance NUMERIC NOT NULL
        )
        `;

        this.transactionsTable = `
        CREATE TABLE IF NOT EXISTS
        transactions(
          id SERIAL PRIMARY KEY,
          createOn TIMESTAMP,
          type VARCHAR(30) NOT NULL,
          accountNumber BIGINT NOT NULL,
          cashier SERIAL REFERENCES users(id) ON DELETE CASCADE,
          amount NUMERIC NOT NULL,
          oldBalance NUMERIC NOT NULL,
          newBalancee NUMERIC NOT NULL
        )
        `; 
        /**
         * 
         * @param {object} password 
         * @param {object} salt 
         * @returns encrypted password with it salt value for decryption
         */
        const encryptPassword = function(password, salt) {
            try {
                return crypto
                        .createHmac('sha1', salt)
                        .update(password)
                        .digest('hex');
            } catch (err) {
                
            }
        };
        /**
         * @returns random value to create salt
         */
        const makeSalt = () => {
            return Math.round((new Date().valueOf() * Math.random())) + '';
        };
        const salt = makeSalt();
        const hashed_password = encryptPassword("regedit56", salt);
        

        this.newUser = [
            "admin@gmail.com",
            "admin",
            "admin",
            hashed_password,
            "cashier",
            true,
            moment(new Date()),
            moment(new Date()),
            salt
        ];
        this.text = "INSERT INTO users(email,firstname,lastname,password,type,isadmin,created_date,modified_date,salt) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";

        this.account = [
            100000,
            moment(new Date()),
            1,
            "savings",
            "active",
            2000,
        ];
        this.accountQuery = "INSERT INTO accounts(accountnumber, createon, owner, type, status, balance) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
        this.test = `SELECT * FROM users WHERE email='admin@gmail.com'`;
        this.initDb();
    }
    /**
     * 
     * @param {object} sql 
     * @param {object} data 
     * @return it should run database queries for specific reason
     */
    async query(sql, data = []) {
        const conn = await this.connect();
        try{
            if(data.length) {
                return await conn.query(sql, data);
            }
            return await conn.query(sql);
        } catch(error) {
            return error
        } finally {
            conn.release();
        }
    }
    /**
     * this initDb is for running
     * queries when it is called
     */
    async initDb() {
        await this.query(this.usersTable);
        await this.query(this.accountsTable);
        await this.query(this.transactionsTable);
        await this.query(this.test).then(result => {
            if(result.rows.length) {
                
            } else {
                this.query(this.text, this.newUser).then(result => {
                });
            }
        });
        await this.query(this.accountQuery, this.account).then(result => {
            console.log("Account created");
        });

        console.log("users table created");
    }
}

export default new Db();