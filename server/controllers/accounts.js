import Db from './../db/index';
import validation from './../validations/validations';

class AccountController {
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @return account is created when validations passes
     */
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
                const sql = "INSERT INTO accounts(accountnumber, createon, owner, type, status, balance) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
                Db.query(sql, account).then(result => {
                    res.status(201).json({
                        status: 201,
                        data: result.rows
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
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @body {object} status
     * @returns account activated or deactivated
     */
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
            if(result.rows.length) {
                if(result.rows[0].status === status.toLowerCase()) {
                    res.status(400).json({
                        status: 400,
                        error: `the account is already ${status.toLowerCase()}`
                    });
                } else {
                    const sql = `UPDATE accounts SET status='${status.toLowerCase()}' WHERE accountnumber='${acc}' RETURNING *`;
                Db.query(sql).then(result => {
                    if(result.rows) {
                        return res.status(200).json({
                            status: 200,
                            data: {
                                accountNumber: acc,
                                status: status.toLowerCase()
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
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns account deleted if validations passes
     */
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
                    if(result.rows) {
                        return res.status(200).json({
                            status: 200,
                            message: `the account with (${acc}) have been deleted successfully.`
                        });
                    } else {
                        res.status(404).json({
                            status: 404,
                            error: `this account number (${acc}) is not successfully deleted`
                        });
                    }
                }).catch(error => {
                    res.status(404).json({
                        status: 404,
                        error: `The server encountered the problem, check for the administration`
                    });
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: `the account number with (${acc}) is not found for deletion`
                });
            }
        });
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns returns user accounts
     */
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
                            error: `the user with ${email} has no account, you can create an account first.` 
                        });
                    }
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: `the user with ${email} is not found.`
                });
            }
        });
    }

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns all accounts from database
     */
    getAll(req, res) {
        const status = req.query.status;

        if(!status) {
            Db.query("SELECT * FROM accounts").then((result) => {
                if(result.rows.length) {
                    return res.json({
                        status: 200,
                        data: result.rows
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        error: `There is no account found in the system, you may create one and check again.`
                    });
                }
            });
        } else {
            if(validation.isValidAccountStatus(status)) {
                Db.query(`SELECT * FROM accounts WHERE status='${status}'`).then((result) => {
                    if(result.rows.length) {
                        res.status(200).json({
                            status: 200,
                            data: result.rows
                        });
                    } else {
                        res.status(404).json({
                            status: 404,
                            error: `There is no account with active status`
                        });
                    }
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: `The status specified in the url is not valid, it should be active, dormant or draft.`
                });
            }
        }
        
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns user's accounts
     */
    viewUserAccounts(req, res) {
        const {
            email
        } = req.userInfo;
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
                            error: `There is no accounts found for this user ${email}, you should create it first` 
                        });
                    }
                });
            }
        });
    }

    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns one account is returned
     */
    getAccount(req, res) {
        const {
            accountNumber
        } = req.params;
        const {
            email
        } = req.userInfo;
        const parseAcc = parseInt(accountNumber);
        const query1 = `SELECT * FROM accounts WHERE accountnumber='${parseAcc}'`;
        Db.query(query1).then(result => {
            if(result.rows.length) {
                const details = result.rows;
                const query2 = `SELECT * FROM users WHERE email='${email}'`;
                Db.query(query2).then(result => {
                    if(result.rows.length) {
                        if(result.rows.owner === details.id) {
                            res.status(200).json({
                                status: 200,
                                data: details
                            });
                        } else {
                            res.status(403).json({
                                status: 403,
                                error: `The account provided is not yours please ensure that is written well`
                            });
                        }
                    } else {
                        res.status(404).json({
                            status: 404,
                            error: `you must login or signup for accessing the endpoint api`
                        });
                    }
                });
                
            } else {
                res.status(404).json({
                    status: 200,
                    error: `There is no account with the one you provided ${parseAcc}`
                });
            }
        });
    }
}

const account = new AccountController();
export default account;