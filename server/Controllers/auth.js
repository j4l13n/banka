import userdb from './../mockdb/user';
import jwt from 'jsonwebtoken';
import config from './../config/config';
import expressJwt from 'express-jwt';


class AuthController {
    signin(req, res) {
        const findOne = userdb.find(user => user.email === req.body.email);
        if(!findOne) {
            res.status(404).send({
                status: 404,
                error: "User not found"
            });
        }
        if(findOne.password !== req.body.password) {
            res.status(401).send({
                status: 401,
                error: "Email and password don't match"
            });
        }

        const token = jwt.sign({
            _id: findOne.id
        }, config.jwtSecret);

        res.cookie("t", token, {
            expire: new Date() + 9999
        });

        return res.status(200).send({
            status: 200,
            data: {
                token: token,
                id: findOne.id,
                firstName: findOne.firstname,
                lastName: findOne.lastname,
                email: findOne.email
            }
        });

    }

    signout(req, res) {
        
    }
}

const authController = new AuthController();
export default authController;