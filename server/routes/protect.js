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
            error: "not allowed for access"
        });
    }
};

export default checkUser;