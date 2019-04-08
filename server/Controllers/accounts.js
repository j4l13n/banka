import accountdb from './../mockdb/account'
import userdb from './../mockdb/user'

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
            id: accountdb.length + 1,
            accountNumber:"12348765433456",
            createOn: Date.now(),
            owner: req.body.owner,
            type: req.body.type,
            status: "active",
            balance: 0
        };

        accountdb.push(account);
        const getuser = userdb.find(user => user.id === req.body.owner);
        return res.status(201).send({
            status: 201,
            message: "account created successfully.",
            data: {
                accountNumber: account.accountNumber,
                firstname: getuser.firstname,
                lastname: getuser.lastname,
                email: getuser.email,
                type: account.type,
                openingBalance: account.balance
            }
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