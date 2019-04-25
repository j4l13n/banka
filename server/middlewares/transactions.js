import validation from './../validations/validations';

class TransactionValidate {
    debitValidate(req, res, next) {
        if(!req.body.amount) {
            res.status(400).json({
                status: 400,
                error: `the amount field is required`
            });
        } else if(!validation.isValidNumber(req.body.amount)) {
            res.status(400).json({
                status: 400,
                error: `to withdraw the amount must be numbers`
            });
        } else if(!validation.isValidNumber(req.params.accountNumber)) {
            res.status(400).json({
                status: 400,
                error: `The account number must only have numbers`
            });
        } else {
            next();
        }
    }

    creditValidate(req, res, next) {

        if(!req.body.amount) {
            res.status(400).json({
                status: 400,
                error: `the amount field is required`
            });
        } else if(!validation.isValidNumber(req.body.amount)) {
            res.status(400).json({
                status: 400,
                error: `to deposit the amount must be numbers`
            });
        } else if(!validation.isValidNumber(req.params.accountNumber)) {
            res.status(400).json({
                status: 400,
                error: `The account number must only have numbers`
            });
        } else {
            next();
        }
    }

    accountNumberValidate(req, res, next) {
        if(!validation.isValidNumber(req.params.accountNumber)) {
            res.status(400).json({
                status: 400,
                error: `The account number must only have numbers`
            });
        } else {
            next();
        }
    }

    idValidate(req, res, next) {
        if(!validation.isValidNumber(req.params.id)) {
            res.status(400).json({
                status: 400,
                error: `Only digits number are allwed for id`
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