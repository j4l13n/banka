import transactiondb from './../mockdb/transaction';
import accountdb from './../mockdb/account';

class TransactionController {
    getAll(req, res) {
        return res.status(200).send({
            status: 200, 
            message: "Transaction retrieved successfully",
            data: transactiondb
        });
    }

    debitAccount(req, res) {
        const accountN = parseInt(req.params.account);
        if(accountN) {

            const getAccount = accountdb.find(account => account.accountNumber === accountN);

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
            }

            if(getAccount) {
                // if(!req.body.cashier) {
                //     return res.status(400).send({
                //        status: 400,
                //        error: "cashier is required", 
                //     });
                // } else if(!req.body.amount) {
                //     return res.status(400).send({
                //         status: 400,
                //         error: "amount is required", 
                //      });
                // }
                // const cashier = parseInt(req.body.cashier);
                // const amount = parseInt(req.body.amount);

                const newTrans = {
                    id: transactiondb.length + 1,
                    createOn: Date.now,
                    type: "debit",
                    accountNumber: accountN,
                    cashier: parseInt(req.body.cashier),
                    amount: parseFloat(req.body.amount),
                    oldBalance: getAccount.balance,
                    newBalancee: getAccount.balance - amount
                };

                transactiondb.push(newTrans);
                return res.status(200).send({
                    status: 200,
                    message: "Account found",
                    data: {
                        transactionId: getAccount.id,
                        accountNumber: getAccount.accountNumber,
                        amount: 5000.0,
                        cashier: 1,
                        TransactionType: "debit",
                        accountBalance: 20000.0
                    }
                });
            } else {
                return res.status(404).send({
                    status: 404,
                    message: "Account not found"
                });
            }
        } else {
            return res.status(404).send({
                status: 404,
                message: "Account not found in parameters"
            });
        }
    }
}

const transactionController = new TransactionController();
export default transactionController;