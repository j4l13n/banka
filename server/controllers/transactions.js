import Db from './../db/index';
import moment from 'moment';

class TransactionsController {
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
                                console.log(result.rows);
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
                                console.log(result.rows);
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
                                error: "Your balance is not enough to withdraw."
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
                    error: "You are not allowed to debit, please use staff account!"
                });
            }
        });
    }

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
                            console.log(result.rows);
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
                            console.log(result.rows);
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

    userHistory(req, res) {
        const {
            accountNumber
        } = req.params;
        const {
            email
        } = req.body;
        const parseAcc = parseInt(accountNumber);
        const query1 = `SELECT * FROM users WHERE email='${email}'`;
        Db.query(query1).then(result => {
            console.log(result.rows);
            if(result.rows.length) {
                const owner = result.rows[0].id;
                const admin = result.rows[0].isAdmin;
                const query2 = `SELECT * FROM accounts WHERE accountnumber='${parseAcc}'`;
                Db.query(query2).then(result => {
                    if(result.rows) {
                        if(admin) {
                            const query3 = `SELECT * FROM transactions WHERE accountnumber='${result.rows[0].accountNumber}'`;
                            Db.query(query3).then(result => {
                                if(result.rows.length){
                                    res.status(200).json({
                                        status: 200,
                                        data: result.rows
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
                                }
                            });
                        } else {
                            res.status(400).json({
                                status: 400,
                                error: "Not allowed to view this account history"
                            });
                        }
                    }
                }).catch(error => {
                    res.status(404).json({
                        status: 404,
                        error: "Account number not found"
                    });
                });
            }
        }).catch(error => {
            res.status(404).json({
                status: 404,
                error: "User not found"
            });
        });
    }

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
                    error: "Transaction not found"
                });
            }
        }).catch(error => {
            res.status(404).json({
                status: 404,
                error: "Transaction not found"
            });
        });
    }
}

const transactions = new TransactionsController();
export default transactions;