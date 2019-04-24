import pg, { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let poolOptions;
if (process.env.DATABASE_URL) {
    poolOptions = { connectionString: process.env.DATABASE_URL };
} else {
    poolOptions = {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDB,
        password: process.env.PGPASS,
    };
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
        console.log("users table created");
    }
}

export default new Db();