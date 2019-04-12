import userdb from './../mockdb/user';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from './../config/config';

class UsersController {
    getAllUsers(req, res) {
        return res.status(200).send({
            status: 200,
            message: 'users retrieved successfully',
            data: userdb,
        });
    }

    getUser(req, res) {
        const getuser = userdb.find(user => user.id === parseInt(req.params.id, 10));
        if (getuser) {
            return res.status(200).send({
                status: 200,
                message: 'user retrieved successfully',
                data: getuser,
            });
        } else {
            return res.status(404).send({
                status: 404,
                message: "User not found"
            });
        }

    }

    createUser(req, res) {
        if (!req.body.firstname) {
            return res.status(400).send({
                status: 400,
                message: "firstname is required",
            });
        } else if (!req.body.lastname) {
            return res.status(400).send({
                status: 400,
                message: "lastname is required",
            });
        } else if (!req.body.email) {
            return res.status(400).send({
                status: 400,
                message: "email is required",
            });
        } else if (!req.body.password) {
            return res.status(400).send({
                status: 400,
                message: "password is required",
            });
        }

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
        const user = {
            id: Math.floor(Date.now() * Math.random()),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: encryptPassword(req.body.password, salt),
            type: "client",
            isAdmin: false,
            salt: salt
        };

        userdb.push(user);
        const token = jwt.sign({
            _id: user.id
        }, config.jwtSecret);

        res.cookie("token", token, {
            expire: new Date() + 9999
        });

        return res.status(201).send({
            status: 201,
            message: 'user added successfully',
            data: {
                token: token,
                id: user.id,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email
            }
        });
    }

    deleteUser(req, res) {
        const id = parseInt(req.params.id, 10);
        let userFound;
        let itemIndex;
        userdb.map((user, index) => {
            if (user.id === id) {
                userFound = user;
                itemIndex = index;
            }
        });

        if (!userFound) {
            return res.status(404).send({
                status: 404,
                message: 'user not found',
            });
        }

        userdb.splice(itemIndex, 1);
        return res.status(200).send({
            status: 200,
            message: 'User deleted successfully',
        });
    }
}

const userController = new UsersController();
export default userController;