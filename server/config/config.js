const config = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || '%$DGHFDIilnh#@#$D',
    dbUrl: process.env.DATABASE_URL || 'postgres://root:regedit56@127.0.0.1:5432/bankadb'
};

module.exports = config;