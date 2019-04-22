import jwt from "jsonwebtoken";;
import Db  from "./../db/index";
import moment from 'moment';
import crypto from 'crypto';

class UserController{
    signup(req,res){
        const{
            email,
            firstName,
            lastName,
            password,
        } = req.body;
        const type = "client";
        const sql1 =`SELECT * FROM users WHERE email='${email}'`;
        
        Db.query(sql1).then((result) =>{
            console.log(result.rows);

            if (result.rows.length){
                return res.status(400).json({
                    status: 400,
                    error: `user with ${email} as email already exists`
                });
            }else{
                const token = jwt.sign({
                    email,
                    firstName
                },
                    'secret',
                    {
                        expiresIn: "1h",
                    }
                );

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
                    firstName,
                    lastName,
                    hashed_password,
                    type,
                    false,
                    moment(new Date()),
                    moment(new Date()),
                    salt
                ];
                console.log(newUser);
                const sql = "INSERT INTO users(email,firstName,lastName,password,type,isAdmin,created_date,modified_date,salt) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";
                
                Db.query(sql, newUser).then((result) => {
                    console.log(result.rows);
                    res.status(201).json({
                        status: 201,
                        data: {
                            token: token,
                            firstname: firstName,
                            lastname: lastName,
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
    
}

const users = new UserController();
export default users;