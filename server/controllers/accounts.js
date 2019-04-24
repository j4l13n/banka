import Db from './../db/index';
import config from './../config/config';
import moment from 'moment';

class AccountController {
    create(req, res) {
        const randomInt = (low, high) =>  Math.floor(Math.random() * (high - low) + low);
        const {
            email
        } = req.userInfo;
        const {
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
                    type.toLowerCase(),
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

    activateOrDeactivate(req, res) {
        const {
            accountNumber
        } = req.params;
        let acc = parseInt(accountNumber);
        const {
            status
        } = req.body;
        const query = `SELECT * FROM accounts WHERE accountnumber='${acc}'`;
        Db.query(query).then(result => {
            console.log(result.rows);
            if(result.rows.length) {
                if(result.rows[0].status === status) {
                    res.status(400).json({
                        status: 400,
                        error: "account is " + status
                    });
                } else {
                    const sql = `UPDATE accounts SET status='${status}' WHERE accountnumber='${acc}' RETURNING *`;
                Db.query(sql).then(result => {
                    console.log(result.rows);
                    if(result.rows) {
                        return res.status(200).json({
                            status: 200,
                            data: {
                                accountNumber: acc,
                                status: status
                            }
                        });
                    } else {
                        res.status(404).json({
                            status: 404,
                            error: "Account not updated"
                        });
                    }
                });
                }
            } else {
                res.status(404).json({
                    status: 404,
                    error: "Account not found"
                });
            }
        }).catch(error => {
            res.status(404).json({
                status: 404,
                error: "Account not found"
            });
        });
    }
    deleteAccount(req, res) {
        const {
            accountNumber
        } = req.params;
        const acc = parseInt(accountNumber);
        const query = `SELECT * FROM accounts WHERE accountnumber='${acc}'`;
        Db.query(query).then(result => {
            if(result.rows.length) {
                const sql = `DELETE FROM accounts WHERE accountnumber='${acc}' RETURNING *`;
                Db.query(sql).then(result => {
                    console.log(result.rows);
                    if(result.rows) {
                        return res.status(200).json({
                            status: 200,
                            message: "Account successfully deleted"
                        });
                    } else {
                        res.status(404).json({
                            status: 404,
                            error: "Account not deleted"
                        });
                    }
                }).catch(error => {
                    res.status(404).json({
                        status: 404,
                        error: "Account not deleted"
                    });
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "Account not found to be deleted"
                });
            }
        });
    }

    viewAccounts(req, res) {
        const {
            email
        } = req.params;
        const query1 = `SELECT * FROM users WHERE email = '${email}'`;
        Db.query(query1).then(result => {
            if(result.rows.length) {
                const owner = result.rows[0].id;
                const query2 = `SELECT * FROM accounts WHERE owner='${owner}'`;
                Db.query(query2).then(result => {
                    if(result.rows.length) {
                        res.status(200).json({
                            status: 200,
                            data: result.rows
                        }); 
                    } else {
                        res.status(404).json({
                            status: 404,
                            error: `no accounts found for ${email}` 
                        });
                    }
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: "user not found for checking his/her accounts"
                });
            }
        });
    }

    getAll(req, res) {
        const status = req.query.status;

        if(status === "dormant" || status === "active") {
            console.log(status);
            Db.query(`SELECT * FROM accounts WHERE status='${status}'`).then((result) => {
                if(result.rows) {
                    console.log(result.rows);
                    res.status(200).json({
                        status: 200,
                        data: result.rows
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        error: "No account found"
                    });
                }
            }).catch(error => {
                res.status(404).json({
                    status: 404,
                    error: "No account found"
                });
            });
        } else {
            Db.query("SELECT * FROM accounts").then((result) => {
                if(result.rows) {
                    return res.json({
                        status: 200,
                        data: result.rows
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        error: "There is no created account yet, you just can create it"
                    });
                }
            }).catch(error => {
                res.status(404).json({
                    status: 404,
                    error: "No accounts found in database"
                });
            });
        }
        
    }
}

const account = new AccountController();
export default account;