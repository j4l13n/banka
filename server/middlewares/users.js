import validator from 'validator'; 
import validation from './../validations/validations'; 

class UserValidate {
    validateSignin(req, res, next) {
        if(!validator.isEmail(req.body.email)) {
            res.status(400).json({
                status: 400,
                error: "You email is not valid"
            });
        } else if(!validation.isValidPassword(req.body.password)) {
            res.status(400).json({
                status: 400,
                error: "You password must contain characters and numbers"
            });
        } else {
            next();
        }
    }

    validateSignup(req, res, next) {
        if(!validator.isAlpha(req.body.firstname)) {
            res.status(400).json({
                status: 400,
                error: "You firstname is not valid"
            });
        } else if(!validator.isAlpha(req.body.lastname)) {
            res.status(400).json({
                status: 400,
                error: "You lastname is not valid"
            });
        } else if(!validator.isEmail(req.body.email)) {
            res.status(400).json({
                status: 400,
                error: "You email is not valid"
            });
        } else if(!validation.isValidPassword(req.body.password)) {
            res.status(400).json({
                status: 400,
                error: "Your password must lowercase, uppercase and numbers, and also greater than 6 character"
            });
        } else {
            next();
        }
    }

    validateAdminSignup(req, res, next) {
        if(!validator.isAlpha(req.body.firstname)) {
            res.status(400).json({
                status: 400,
                error: "You firstname is not valid"
            });
        } else if(!validator.isAlpha(req.body.lastname)) {
            res.status(400).json({
                status: 400,
                error: "You lastname is not valid"
            });
        } else if(!validator.isEmail(req.body.email)) {
            res.status(400).json({
                status: 400,
                error: "You email is not valid"
            });
        } else if(!validation.isValidPassword(req.body.password)) {
            res.status(400).json({
                status: 400,
                error: "Your password must lowercase, uppercase and numbers, and also greater than 6 character"
            });
        } else if(!validation.isValidUserType(req.body.type)) {
            res.status(400).json({
                status: 400,
                error: "Your user type is not valid"
            });
        }else {
            next();
        }
    }
}

const userValidate = new UserValidate();
export default userValidate;