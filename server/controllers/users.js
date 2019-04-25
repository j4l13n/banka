import jwt from "jsonwebtoken";
import Db  from "./../db/index";
import moment from 'moment';
import crypto from 'crypto';
import config from './../config/config';

class UserController{
    signup(req,res){
        const{
            email,
            firstname,
            lastname,
            password,
        } = req.body;
        const type = "client";
        const sql1 =`SELECT * FROM users WHERE email='${email}'`;
        
        Db.query(sql1).then((result) =>{
            console.log(result.rows);

            if (result.rows){
                return res.status(400).json({
                    status: 400,
                    error: `user with ${email} as email already exists`
                });
            }else{
                const token = jwt.sign({
                    email: email,
                    type: type,
                    isadmin: false
                }, config.jwtSecret);

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
                const hashed_password = encryptPassword(password, salt);
                

                const newUser = [
                    email,
                    firstname,
                    lastname,
                    hashed_password,
                    type,
                    false,
                    moment(new Date()),
                    moment(new Date()),
                    salt
                ];
                console.log(newUser);
                const sql = "INSERT INTO users(email,firstname,lastname,password,type,isadmin,created_date,modified_date,salt) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";
                
                Db.query(sql, newUser).then((result) => {
                    console.log(newUser);
                    console.log(result.rows);
                    res.status(201).json({
                        status: 201,
                        data: {
                            token: token,
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            hashed_password: hashed_password,
                            type: type,
                            isAdmin: false
                        }
                    });
                });
            }

        });
    }

    getAll(req, res) {
        Db.query("SELECT * FROM users").then((result) => {
            if(result.rows.length) {
                return res.json({
                    status: 200,
                    data: result.rows
                });
            }
        });
    }

    signin(req, res) {
        const {
            email,
            password
        } = req.body;

        Db.query(`SELECT * FROM users WHERE email='${email}'`).then(result => {
            if(result.rows.length) {
                const encryptPassword = function(password) {
                    try {
                        return crypto
                                .createHmac('sha1', result.rows[0].salt)
                                .update(password)
                                .digest('hex');
                    } catch (err) {
                        
                    }
                };
        
                const authenticate = (plainText) => {
                    return encryptPassword(plainText) === result.rows[0].password;
                };
                if(authenticate(password)){
                    console.log(result.rows[0].password);
                    const token = jwt.sign({
                        _id: result.rows[0].id,
                        email: result.rows[0].email,
                        isAdmin: result.rows[0].isAdmin
                    }, config.jwtSecret);
            
                    res.cookie("token", token, {
                        expire: new Date() + 9999
                    });
                    res.status(200).json({
                        status: 200,
                        data: {
                            token: token,
                            firstname: result.rows[0].firstname,
                            lastname: result.rows[0].lastname,
                            email: result.rows[0].email
                        }
                    });
                } else {
                    res.status(400).json({
                        status: 400,
                        error: "password is not correct"
                    });
                }
            } else {
                res.status(400).json({
                    status: 400,
                    error: "user does not exists"
                });
            }
        });
    }

    createStaff(req, res) {
        const{
            email,
            firstname,
            lastname,
            password,
            type
        } = req.body;
        const sql1 =`SELECT * FROM users WHERE email='${email}'`;
        
        Db.query(sql1).then((result) =>{
            console.log(result.rows);

            if (result.rows.length){
                return res.status(400).json({
                    status: 400,
                    error: `user with ${email} as email already exists`
                });
            }else{
                
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
                const hashed_password = encryptPassword(password, salt);
                

                const newUser = [
                    email,
                    firstname,
                    lastname,
                    hashed_password,
                    type,
                    true,
                    moment(new Date()),
                    moment(new Date()),
                    salt
                ];
                console.log(newUser);
                const sql = "INSERT INTO users(email,firstname,lastname,password,type,isadmin,created_date,modified_date,salt) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";
                
                Db.query(sql, newUser).then((result) => {
                    console.log(result.rows);
                    if(result.rows) {
                        const token = jwt.sign({
                            email: email,
                            type: type,
                            isadmin: true
                        }, config.jwtSecret);
                        
                        res.status(201).json({
                            status: 201,
                            data: {
                                token: token,
                                firstname: firstname,
                                lastname: lastname,
                                email: email,
                                hashed_password: hashed_password,
                                type: type,
                                isAdmin: true
                            }
                        });
                    } else {
                        res.status(400).json({
                            status: 400,
                            error: "Staff not created"
                        });
                    }
                });
            }

        });
    }
    
}

const users = new UserController();
export default users;