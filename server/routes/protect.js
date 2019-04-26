import jwt from 'jsonwebtoken';
import config from './../config/config';
import { decode } from 'punycode';

const checkUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret);
        req.userInfo = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            status: 401,
            error: `You are logged in, you must first login or signup`
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
                error: `This user is not allowed to access the route, only cashiermust`
            });
        }
    } catch (error) {
        return res.status(401).send({
            status: 401,
            error: `You are logged in, you must first login or signup`
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
                error: `This user is not allowed to access the route, only admin must`
            });
        }
    } catch (error) {
        return res.status(401).send({
            status: 401,
            error: `You are logged in, you must first login or signup`
        });
    }
};

const checkAdminOrStaff = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret);
        req.userInfo = decoded;
        if(decoded.isadmin === true || decode.type === "cashier") {
            next();
        } else {
            res.status(403).json({
                status: 403,
                error: `This user is not allowed to access the route, only admin must`
            });
        }
    } catch (error) {
        return res.status(401).send({
            status: 401,
            error: `You are not logged in, you must first login or signup`
        });
    }
};

export default {
    checkUser,
    checkCashier,
    checkAdmin,
    checkAdminOrStaff
};