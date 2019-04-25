import pg, { Pool } from 'pg';
import dotenv from 'dotenv';
import config from './../config/config'
import moment from 'moment';

dotenv.config();

let poolOptions = {
    connectionString: process.env.NODE_ENV === "test" ? config.testDbUrl : config.dbUrl 
}

class Db {
    constructor() {
        this.pool = new Pool(poolOptions);
        this.connect = async () => this.pool.connect();

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

        const encryptPassword = function(password, salt) {
            try {
                return crypto
                        .createHmac('sha1', salt)
                        .update(password)
                        .digest('hex');
            } catch (err) {
                
            }
        };
        
        const makeSalt = () => {
            return Math.round((new Date().valueOf() * Math.random())) + '';
        };
        const salt = makeSalt();
        const hashed_password = encryptPassword("regedit56", salt);
        

        const newUser = [
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
        const sql = "INSERT INTO users(email,firstname,lastname,password,type,isadmin,created_date,modified_date,salt) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";

        this.initDb();
    }

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
    async initDb() {
        await this.query(this.usersTable);
        await this.query(this.accountsTable);
        await this.query(this.transactionsTable);
        await this.query("SELECT * FROM users WHERE email='admin@gmail.com'").then(result => {
            if(result.rows) {
                console.log("Admin already exists")
            } else {
                this.query(sql, newUser).then(result => {
                    if(result.rows) {
                        console.log("admin created");
                    } else {
                        console.log("Admin is not created");
                    }
                });
            }
        });

        console.log("users table created");
    }
}

export default new Db();