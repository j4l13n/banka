import validation from './../validations/validations';

class AccountValidate {
    createValidate(req, res, next) {
        if(!validation.isValidAccountType(req.body.type)) {
            res.status(400).json({
                status: 400,
                error: "type must be savings or current"
            });
        } else {
            next();
        }
    }

    updateValidate(req, res, next) {
        if(!validation.isValidAccountStatus(req.body.status)) {
            res.status(400).json({
                status: 400,
                error: "status must be active, dormant or draft"
            });
        } else {
            next();
        }
    }

    deleteValidate(req, res, next) {
        if(!validation.isValidNumber(req.params.accountNumber)) {
            res.status(400).json({
                status: 400,
                error: "you account number must contain only digits"
            });
        } else {
            next();
        }
    }
}

const accountValidate = new AccountValidate();
export default accountValidate;