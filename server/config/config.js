const dotenv = require('dotenv');

/**
 * configuration for development
 */
dotenv.config();
const config = {
    port: process.env.PORT || 3300,
    jwtSecret: process.env.JWT_SECRET || '%$DGHFDIilnh#@#$D',
    dbUrl: process.env.DATABASE_URL || 'postgres://root:regedit56@127.0.0.1:5432/bankadb',
    testDbUrl: process.env.TS_DATABASE_URL || 'postgres://root:regedit56@127.0.0.1:5432/testdb'
};

module.exports = config;
