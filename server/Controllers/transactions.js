import accountdb from './../mockdb/account.js';
import transaction from './../mockdb/transaction';

class TransactionController {
    getAll(req, res) {
        return res.status(200).send({
            status: 200, 
            message: "Transaction retrieved successfully",
            data: transaction
        });
    }

    debitAccount(req, res) {
        const accountN = parseInt(req.params.acc, 10);
        let accountFound;
        let accountIndex;
        accountdb.map((acc, index) => {
            if(acc.accountNumber === accountN) {
                accountIndex = index;
                accountFound = acc;
            }
        });

        if(!accountFound) {
            return res.status(404).send({
                status: 404,
                error: "Account not found"
            });
        } else {

            if(!req.body.cashier) {
                res.status(400).send({
                    status: 400,
                    error: "Cashier required"
                });
            } else if (!req.body.amount) {
                res.status(400).send({
                    status: 400,
                    error: "Amount required"
                });
            } else {

                if(parseFloat(req.body.amount) < accountFound.balance) {
                    const newtransaction = {
                        id: Math.floor(Date.now() * Math.random()),
                        createOn: Date.now(),
                        type: "debit",
                        accountNumber: accountFound.accountNumber,
                        cashier: parseInt(req.body.cashier),
                        amount: parseFloat(req.body.amount),
                        oldBalance: accountFound.balance,
                        newBalancee: accountFound.balance - parseFloat(req.body.amount)
                    };
    
                    transaction.push(newtransaction);
    
                    const newaccount = {
                        id : accountFound.id,
                        accountNumber: accountFound.accountNumber,
                        createOn: accountFound.accountNumber,
                        owner: accountFound.owner,
                        type: accountFound.type,
                        status: accountFound.status,
                        balance: accountFound.balance - newtransaction.amount
                    };
    
                    accountdb.splice(accountIndex, 1, newaccount);
                    return res.status(200).send({
                        status: 200,
                        data: {
                            transactionId: accountFound.id,
                            accountNumber: accountFound.accountNumber,
                            amount: newtransaction.amount,
                            cashier: newtransaction.cashier,
                            TransactionType: newtransaction.type,
                            accountBalance: newtransaction.newBalancee
                        }
                    });
                } else {
                    res.status(400).send({
                        status: 400,
                        error: "Not enough balance"
                    });
                }
            }
        }

    }

    creditAccount(req, res) {
        const accountN = parseInt(req.params.acc);
        let accountFound;
        let accountIndex;
        accountdb.map((acc, index) => {
            if(acc.accountNumber === accountN) {
                accountIndex = index;
                accountFound = acc;
            }
        });

        if(!accountFound) {
            return res.status(404).send({
                status: 404,
                message: "Account not found"
            });
        } else {

            if(!req.body.cashier) {
                res.status(400).send({
                    status: 400,
                    error: "Cashier required"
                });
            } else if (!req.body.amount) {
                res.status(400).send({
                    status: 400,
                    error: "Amount required"
                });
            } else {
                const newtransaction = {
                    id: Math.floor(Date.now() * Math.random()),
                    createOn: Date.now(),
                    type: "credit",
                    accountNumber: accountFound.accountNumber,
                    cashier: parseInt(req.body.cashier),
                    amount: parseFloat(req.body.amount),
                    oldBalance: accountFound.balance,
                    newBalancee: accountFound.balance + parseFloat(req.body.amount)
                };

                transaction.push(newtransaction);

                const newaccount = {
                    id : accountFound.id,
                    accountNumber: accountFound.accountNumber,
                    createOn: accountFound.accountNumber,
                    owner: accountFound.owner,
                    type: accountFound.type,
                    status: accountFound.status,
                    balance: accountFound.balance + newtransaction.amount
                };

                accountdb.splice(accountIndex, 1, newaccount);
                return res.status(200).send({
                    status: 200,
                    data: {
                        transactionId: accountFound.id,
                        accountNumber: accountFound.accountNumber,
                        amount: newtransaction.amount,
                        cashier: newtransaction.cashier,
                        TransactionType: newtransaction.type,
                        accountBalance: newtransaction.newBalancee
                    }
                });
            }
        }
    }
}

const transactionController = new TransactionController();
export default transactionController;