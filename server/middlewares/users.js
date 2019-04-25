import validation from './../validations/validations'; 

class UserValidate {
    validateSignin(req, res, next) {
        if(!req.body.email) {
            res.status(400).json({
                status: 400,
                error: `Email is required`
            });
        } else if(!req.body.password) {
            res.status(400).json({
                status: 400,
                error: `Email is required`
            });
        } else if(!validation.isValidEmail(req.body.email)) {
            res.status(400).json({
                status: 400,
                error: `the email you entered (${req.body.email}) is not valid, It must contains one @ and one dot`
            });
        } else if(!validation.isValidPassword(req.body.password)) {
            res.status(400).json({
                status: 400,
                error: `the password entered is not valid, it must contain at least one lowercase, uppercase and number also greater than 6 characters`
            });
        } else {
            next();
        }
    }

    validateSignup(req, res, next) {
        if(!req.body.email) {
            res.status(400).json({
                status: 400,
                error: `Email is required`
            });
        } else if(!req.body.password) {
            res.status(400).json({
                status: 400,
                error: `Password is required`
            });
        } else if(!req.body.firstname) {
            res.status(400).json({
                status: 400,
                error: `Firstname is required`
            });
        } else if(!req.body.lastname) {
            res.status(400).json({
                status: 400,
                error: `Lastname is required`
            });
        } else if(!validation.isValidName(req.body.firstname)) {
            res.status(400).json({
                status: 400,
                error: `Your firstname has to contain only letters and only one space`
            });
        } else if(!validation.isValidName(req.body.lastname)) {
            res.status(400).json({
                status: 400,
                error: `Your lastname has to contain only letters and only one space`
            });
        } else if(!validation.isValidEmail(req.body.email)) {
            res.status(400).json({
                status: 400,
                error: `the email you entered (${req.body.email}) is not valid, It must contains one @ and one dot`
            });
        } else if(!validation.isValidPassword(req.body.password)) {
            res.status(400).json({
                status: 400,
                error: `Your password must contain lowercase, uppercase and numbers, and also greater than 6 character`
            });
        } else {
            next();
        }
    }

    validateAdminSignup(req, res, next) {
        if(!req.body.email) {
            res.status(400).json({
                status: 400,
                error: `Email is required`
            });
        } else if(!req.body.password) {
            res.status(400).json({
                status: 400,
                error: `Password is required`
            });
        } else if(!req.body.firstname) {
            res.status(400).json({
                status: 400,
                error: `Firstname is required`
            });
        } else if(!req.body.lastname) {
            res.status(400).json({
                status: 400,
                error: `Lastname is required`
            });
        } else if(!req.body.type) {
            res.status(400).json({
                status: 400,
                error: `Type is required`
            });
        } else if(!validation.isValidName(req.body.firstname)) {
            res.status(400).json({
                status: 400,
                error: `Your firstname has to contain only letters and only one space`
            });
        } else if(!validation.isValidName(req.body.lastname)) {
            res.status(400).json({
                status: 400,
                error: `Your lastname has to contain only letters and only one space`
            });
        } else if(!validation.isValidEmail(req.body.email)) {
            res.status(400).json({
                status: 400,
                error: `the email you entered (${req.body.email}) is not valid, It must contains one @ and one dot`
            });
        } else if(!validation.isValidPassword(req.body.password)) {
            res.status(400).json({
                status: 400,
                error: "Your password must lowercase, uppercase and numbers, and also greater than 6 character"
            });
        } else if(!validation.isValidUserType(req.body.type)) {
            res.status(400).json({
                status: 400,
                error: `User type entered must specify if user is admin or cashier`
            });
        }else {
            next();
        }
    }
}

const userValidate = new UserValidate();
export default userValidate;