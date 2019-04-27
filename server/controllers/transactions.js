import Db from './../db/index';
import moment from 'moment';

class TransactionsController {
    /**
     * 
     * this method is for debit
     * @param {object} req 
     * @param {object} res 
     * @returns transactions created when validations passes
     */
    debit(req, res) {
        const {
            email
        } = req.userInfo.email;
        const {
            amount
        } = req.body;
        const {
            accountNumber
        } = req.params;
        const parseAmount = parseFloat(amount);
        const parseAcc = parseInt(accountNumber);
        const query1 = `SELECT * FROM users WHERE email='${email}' and type='cashier'`;
        Db.query(query1).then(result => {
            if(result.rows) {
                const query2 = `SELECT * FROM accounts WHERE accountnumber='${parseAcc}' and status='active'`;
                Db.query(query2).then(result => {
                    if(result.rows.length) {
                        if(parseAmount < result.rows[0].balance) {
                            const newBalance = parseFloat(result.rows[0].balance) - parseAmount;
                            const sql = `UPDATE accounts SET balance='${newBalance}' WHERE accountnumber='${parseAcc}'`;
                            Db.query(sql).then(result => {
                            });
                            const newTrans = [
                                moment(new Date()),
                                "debit",
                                result.rows[0].accountnumber,
                                result.rows[0].owner,
                                parseAmount,
                                result.rows[0].balance,
                                newBalance
                            ];
                            const query3 = `INSERT INTO transactions(createOn,type,accountNumber,cashier,amount,oldBalance,newBalancee) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
                            Db.query(query3, newTrans).then(result => {
                                res.status(201).json({
                                    status: 201,
                                    data: {
                                        transactionId: result.rows[0].id,
                                        accountNumber: result.rows[0].accountnumber,
                                        cashier: result.rows[0].cashier,
                                        transactionType: result.rows[0].type,
                                        accountBalance: newBalance
                                    }
                                });
                            });
                        } else {
                            res.status(400).json({
                                status: 400,
                                error: `the amount (${amount}) with not enought to widthraw from your account.`
                            });
                        }
                    } else {
                        res.status(404).json({
                            status: 404,
                            error: `The account number specified does not exist, or might be not active. check nearest branch`
                        });
                    }
                });
            } else {
                res.status(400).json({
                    status: 400,
                    error: "You are not allowed to debit, please use a staff account!"
                });
            }
        });
    }
    /**
     * 
     * this method is for credit
     * @param {object} req 
     * @param {object} res 
     * @returns transactions created when validations passes
     */
    credit(req, res) {
        const {
            email
        } = req.userInfo.email;
        const {
            amount
        } = req.body;
        const {
            accountNumber
        } = req.params;
        const parseAmount = parseFloat(amount);
        const parseAcc = parseInt(accountNumber);
        const query1 = `SELECT * FROM users WHERE email='${email}' and type='cashier'`;
        Db.query(query1).then(result => {
            if(result.rows) {
                const query2 = `SELECT * FROM accounts WHERE accountnumber='${parseAcc}' and status='active'`;
                Db.query(query2).then(result => {
                    if(result.rows.length) {
                        const newBalance = parseFloat(result.rows[0].balance) + parseAmount;
                        const sql = `UPDATE accounts SET balance='${newBalance}' WHERE accountnumber='${parseAcc}'`;
                        Db.query(sql).then(result => {
                        });
                        const newTrans = [
                            moment(new Date()),
                            "credit",
                            result.rows[0].accountnumber,
                            result.rows[0].owner,
                            parseAmount,
                            result.rows[0].balance,
                            newBalance
                        ];
                        const query3 = `INSERT INTO transactions(createOn,type,accountNumber,cashier,amount,oldBalance,newBalancee) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
                        Db.query(query3, newTrans).then(result => {
                            res.status(201).json({
                                status: 201,
                                data: {
                                    transactionId: result.rows[0].id,
                                    accountNumber: result.rows[0].accountnumber,
                                    cashier: result.rows[0].cashier,
                                    transactionType: result.rows[0].type,
                                    accountBalance: newBalance
                                }
                            });
                        });
                    } else {
                        res.status(400).json({
                            status: 400,
                            error: `The account number specified does not exist, or might be not active. check nearest branch`
                        });
                    }
                });
            } else {
                res.status(400).json({
                    status: 400,
                    error: "You are not allowed to credit, please use staff account!"
                });
            }
        }).catch(error => {
            res.status(404).json({
                status: 404,
                error: error
            });
        });
    }
    /**
     * 
     * this method is for user 
     * transaction history
     * @param {object} req 
     * @param {object} res 
     * @returns transactions get all accounts
     */
    userHistory(req, res) {
        const {
            accountNumber
        } = req.params;
        const {
            email
        } = req.userInfo;
        const parseAcc = parseInt(accountNumber);
        const query1 = `SELECT * FROM users WHERE email='${email}'`;
        Db.query(query1).then(result => {
            if(result.rows.length) {
                const owner = result.rows[0].id;
                const admin = result.rows[0].isAdmin;
                const query2 = `SELECT * FROM accounts WHERE accountnumber='${parseAcc}'`;
                Db.query(query2).then(result => {
                    if(result.rows.length) {
                        if(admin) {
                            const query3 = `SELECT * FROM transactions WHERE accountnumber='${result.rows[0].accountNumber}'`;
                            Db.query(query3).then(result => {
                                if(result.rows.length){
                                    res.status(200).json({
                                        status: 200,
                                        data: result.rows
                                    });
                                } else {
                                    res.status(404).json({
                                        status: 404,
                                        error: `with this account number ${parseAcc}, there is no transactions made.`
                                    });
                                }
                            });
                        } else if(owner === result.rows[0].owner) {
                            const query4 = `SELECT * FROM transactions WHERE accountnumber='${parseAcc}'`;
                            Db.query(query4).then(result => {
                                if(result.rows.length){
                                    res.status(200).json({
                                        status: 200,
                                        data: result.rows
                                    });
                                } else {
                                    res.status(404).json({
                                        status: 404,
                                        error: `with this account number ${parseAcc}, there is no transactions made.`
                                    });
                                }
                            });
                        } else {
                            res.status(400).json({
                                status: 400,
                                error: `User with this email (${email})not allowed to view this account history`
                            });
                        }
                    } else {
                        res.status(404).json({
                            status: 404,
                            error: `the account with ${parseAcc} is not found from the system.`
                        });
                    }
                }).catch(error => {
                    res.status(404).json({
                        status: 404,
                        error: `The account specified is not found, you should ask nearest agent`
                    });
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: `the email used is not found, you must login or signup first.`
                });
            }
        }).catch(error => {
            res.status(404).json({
                status: 404,
                error: `the user with ${email} is not found from the system.`
            });
        });
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns should get one specific transaction
     */
    getTransaction(req, res) {
        const {
            id
        } = req.params;

        const transactionId = parseInt(id);
        const query = `SELECT * FROM transactions WHERE id = '${transactionId}'`;
        Db.query(query).then(result => {
            if(result.rows) {
                res.status(200).json({
                    status: 200,
                    data: {
                        transactionId: result.rows[0].id,
                        createOn: result.rows[0].createon,
                        accountNumber: result.rows[0].accountnumber,
                        amount: result.rows[0].amount,
                        cashier: result.rows[0].cashier,
                        TransactionType:result.rows[0].type,
                        accountBalance: result.rows[0].newbalance
                    }
                });
            } else {
                res.status(404).json({
                    status: 404,
                    error: `There is not transactions with the id ${transactionId}`
                });
            }
        }).catch(error => {
            res.status(404).json({
                status: 404,
                error: `There is not transactions with the id ${transactionId}`
            });
        });
    }
}

const transactions = new TransactionsController();
export default transactions;