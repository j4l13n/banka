import accountdb from './../mockdb/account';

class AccountsController {
    getAllAccounts(req, res) {
        return res.status(200).send({
            status: 200,
            message: 'Accounts retrieved successfully',
            data: accountdb,
        });
    }
}


const AccountController = new AccountsController();
export default AccountController;