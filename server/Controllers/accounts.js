import accountdb from './../mockdb/account';
import userdb from './../mockdb/user';

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
        const randomInt = (low, high) =>  Math.floor(Math.random() * (high - low) + low);

        const account = {
            id: Math.floor(Date.now() * Math.random()),
            accountNumber: randomInt(121112121, 999999999),
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
            if (account.accountNumber === id) {
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

    activateAccount(req, res) {
        const id = parseInt(req.params.id, 10);
        
        let accountFound;
        let accountIndex;
        accountdb.map((account, index) => {
            if(account.accountNumber === id) {
                accountFound = account;
                accountIndex = index;
            }
        });

        if(!accountFound) {
            return res.status(404).send({
                status: 404,
                message: "Account not found"
            });
        }

        const account = {
            id : 1,
            accountNumber: accountFound.accountNumber,
            createOn: accountFound.createOn,
            owner: accountFound.owner,
            type: accountFound.type,
            status: req.body.status,
            balance: accountFound.balance
        };

        accountdb.splice(accountIndex, 1, account);
        return res.status(200).send({
            accountNumber: account.accountNumber,
            status: account.status
        });
        
    }
}


const accountController = new AccountsController();
export default accountController;