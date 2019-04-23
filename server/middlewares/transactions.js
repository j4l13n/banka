import validation from './../validations/validations';

class TransactionValidate {
    debitValidate(req, res, next) {
        if(!validation.isValidNumber(req.body.amount)) {
            res.status(400).json({
                status: 400,
                error: "Your amount must be digits"
            });
        } else if(!validation.isValidNumber(req.params.accountNumber)) {
            res.status(400).json({
                status: 400,
                error: "Your account number is not valid"
            });
        } else {
            next();
        }
    }

    creditValidate(req, res, next) {
        if(!validation.isValidNumber(req.body.amount)) {
            res.status(400).json({
                status: 400,
                error: "Your amount must be digits"
            });
        } else if(!validation.isValidNumber(req.params.accountNumber)) {
            res.status(400).json({
                status: 400,
                error: "Your account number is not valid"
            });
        } else {
            next();
        }
    }

    accountNumberValidate(req, res, next) {
        if(!validation.isValidNumber(req.params.accountNumber)) {
            res.status(400).json({
                status: 400,
                error: "Account number is not valid"
            });
        } else {
            next();
        }
    }

    idValidate(req, res, next) {
        if(!validation.isValidNumber(req.params.id)) {
            res.status(400).json({
                status: 400,
                error: "Id is not a number"
            });
        } else {
            next();
        }
    }

    emailIsValid(req, res, next) {
        if(!validation.isValidEmail(req.params.email)) {
            res.status(400).json({
                status: 400,
                error: "Email is not valid"
            });
        } else {    
            next();
        }
    }
}

const transactionValidate = new TransactionValidate();
export default transactionValidate;