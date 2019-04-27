import jwt from "jsonwebtoken";
import Db  from "./../db/index";
import moment from 'moment';
import crypto from 'crypto';
import config from './../config/config';

class UserController{
    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @return if validations passes, user must be signed up 
     */
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

            if (result.rows.length){
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
                const sql = "INSERT INTO users(email,firstname,lastname,password,type,isadmin,created_date,modified_date,salt) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";
                
                Db.query(sql, newUser).then((result) => {
                    res.status(201).json({
                        status: 201,
                        data: {
                            token: token,
                            firstname: firstname,
                            lastname: lastname,
                            email: email
                        }
                    });
                });
            }

        });
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns all users from the database
     */

    getAll(req, res) {
        Db.query("SELECT * FROM users").then((result) => {
            if(result.rows.length) {
                return res.json({
                    status: 200,
                    data: {
                        firstname: result.rows[0].firstname,
                        lastname: result.rows[0].lastname,
                        email: result.rows[0].email
                    }
                });
            }
        });
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns if validations passes user must be logged in
     */
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
                    const token = jwt.sign({
                        email: result.rows[0].email,
                        type: result.rows[0].type,
                        isadmin: result.rows[0].isAdmin
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
                        error: `The password entered is not correct, try again`
                    });
                }
            } else {
                res.status(404).json({
                    status: 404,
                    error: `the email was not found, you should signup first.`
                });
            }
        });
    }

    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @return admin or staff created if validations passes 
     */
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
                const sql = "INSERT INTO users(email,firstname,lastname,password,type,isadmin,created_date,modified_date,salt) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";
                
                Db.query(sql, newUser).then((result) => {
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
                                email: email
                            }
                        });
                    }
                });
            }

        });
    }
    
}

const users = new UserController();
export default users;