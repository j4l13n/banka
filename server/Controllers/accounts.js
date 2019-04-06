import accountdb from './../mockdb/account';

class AccountsController {
    getAllAccounts(req, res) {
        return res.status(200).send({
            status: 200,
            message: 'Accounts retrieved successfully',
            data: accountdb,
        });
    }

    getAccount(req, res) {
        const getAcc = accountdb.find(acc => acc.id === parseInt(req.params.id, 10));

        if (getAcc) {
            return res.status(200).send({
                status: 200,
                message: 'Account retrieved successfully.',
                data: getAcc,
            });
        } else {
            return res.status(404).send({
                status: 404,
                message: "Account not found"
            });
        }
    }

    createAccount(req, res) {
        const account = {
            id: 1,
            accountNumber: "56985236544785",
            createOn: Date.now(),
            owner: 1,
            type: "Current",
            status: "active",
            balance: 200000.0
        };

        accountdb.push(account);
        return res.status(201).send({
            status: 201,
            message: "account created successfully."
        });
    }

    deleteAccount(req, res) {
        const id = parseInt(req.params.id, 10);
        let accountFound;
        let itemIndex;
        accountdb.map((account, index) => {
            if (account.id === id) {
                accountFound = account;
                itemIndex = index;
            }
        });

        if (!accountFound) {
            return res.status(404).send({
                status: 404,
                error: 'Account not found',
            });
        }

        accountdb.splice(itemIndex, 1);
        return res.status(200).send({
            status: 200,
            message: 'Account successfully deleted',
        });
    }
}


const accountController = new AccountsController();
export default accountController;