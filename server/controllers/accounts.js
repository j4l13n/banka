import Db from './../db/index';
import config from './../config/config';
import moment from 'moment';

class AccountController {
    create(req, res) {
        const randomInt = (low, high) =>  Math.floor(Math.random() * (high - low) + low);
        const {
            email,
            type
        } = req.body;

        const sql1 = `SELECT * FROM users WHERE email='${email}'`;

        Db.query(sql1).then(result => {
            if(result.rows.length) {
                console.log(result.rows[0].email);
                let accountNumber = randomInt(10000000, 99999999);
                let createOn = new Date();
                let status = "dormant";
                let balance = 0;
                let owner = result.rows[0].id;
                const account = [
                    accountNumber,
                    createOn,
                    owner,
                    type,
                    status,
                    balance,
                ];
                console.log(account);
                const sql = "INSERT INTO accounts(accountnumber, createon, owner, type, status, balance) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
                Db.query(sql, account).then(result => {
                    console.log(result.rows);
                    res.status(201).json({
                        status: 201,
                        data: {
                            accountNumber: accountNumber,
                            data: result.rows
                        }
                    });
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "account not create, user must specify a valid email address"
                }); 
            }
        });
    }
}

const account = new AccountController();
export default account;