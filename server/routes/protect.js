import jwt from 'jsonwebtoken';
import config from './../config/config';

const checkUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret);
        req.userInfo = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            status: 401,
            error: "not allowed to access this endpoint"
        });
    }
};

const checkCashier = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret);
        req.userInfo = decoded;
        if(decoded.type === "cashier") {
            next();
        } else {
            res.status(403).json({
                status: 403,
                error: "User not allowed for this access"
            });
        }
    } catch (error) {
        return res.status(401).send({
            status: 401,
            error: "User not allowed for this access"
        });
    }
};

const checkAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret);
        req.userInfo = decoded;
        if(decoded.isadmin === true) {
            next();
        } else {
            res.status(403).json({
                status: 403,
                error: "User not allowed to access this route"
            });
        }
    } catch (error) {
        return res.status(401).send({
            status: 401,
            error: "not allowed for this access"
        });
    }
};

export default {
    checkUser,
    checkCashier,
    checkAdmin
};