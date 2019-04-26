import validation from './../validations/validations';

class AccountValidate {
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @param {object} next 
     * @returns next object when validations passed
     */
    createValidate(req, res, next) {
        if(!req.body.type) {
            res.status(400).json({
                status: 400,
                error: `Type field is required`
            });
        } else if(!validation.isValidAccountType(req.body.type.toLowerCase())) {
            res.status(400).json({
                status: 400,
                error: `type field must contain savings and current type only`
            });
        } else {
            next();
        }
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @param {object} next 
     * @returns next object when validations passed
     */
    updateValidate(req, res, next) {
        if(!req.body.status) {
            res.status(400).json({
                status: 400,
                error: `Status field is required`
            });
        } else if(!validation.isValidAccountStatus(req.body.status)) {
            res.status(400).json({
                status: 400,
                error: `status field must contain active, dormant or draft`
            });
        } else {
            next();
        }
    }
    /**
     * 
     * @param {object} req 
     * @param {object} res 
     * @param {object} next 
     * @returns next object when validations passed
     */
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