import Db from './../db/index';
import moment from 'moment';

class TransactionsController {
    debit(req, res) {
        const {
            email,
            amount
        } = req.body;
        const {
            accountNumber
        } = req.params;
        const parseAmount = parseInt(amount);
        const parseAcc = parseInt(accountNumber);
        const query1 = `SELECT * FROM users WHERE email='${email}'`;
        Db.query(query1).then(result => {
            if(result.rows.length) {
                const query2 = `SELECT * FROM accounts WHERE accountnumber='${parseAcc}'`;
                Db.query(query2).then(result => {
                    if(result.rows.length) {
                        if(parseAmount < result.rows[0].balance) {
                            const newBalance = result.rows[0].balance - parseAmount;
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
                        res.status(400).json({
                            status: 400,
                            error: "Account number not found"
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
            email,
            amount
        } = req.body;
        const {
            accountNumber
        } = req.params;
        const parseAmount = parseInt(amount);
        const parseAcc = parseInt(accountNumber);
        const query1 = `SELECT * FROM users WHERE email='${email}'`;
        Db.query(query1).then(result => {
            if(result.rows.length) {
                const query2 = `SELECT * FROM accounts WHERE accountnumber='${parseAcc}'`;
                Db.query(query2).then(result => {
                    if(result.rows.length) {
                        const newBalance = result.rows[0].balance + parseAmount;
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
                            error: "Account number not found"
                        });
                    }
                });
            } else {
                res.status(400).json({
                    status: 400,
                    error: "You are not allowed to credit, please use staff account!"
                });
            }
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
                    if(result.rows.length) {
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
                });
            }
        });
    }
}

const transactions = new TransactionsController();
export default transactions;