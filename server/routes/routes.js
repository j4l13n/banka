import express from 'express';
import userController from './../Controllers/users';
import accountController from './../Controllers/accounts';
import transactionController from './../Controllers/transactions';
import authController from './../Controllers/auth';
import jwt from 'jsonwebtoken';
import config from './../config/config';
import { runInNewContext } from 'vm';

const router = express.Router();

const checkUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret);
        req.userInfo = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            status: 401,
            error: "not allowed for access"
        });
    }
};


router.get("/api/v1/users", checkUser, userController.getAllUsers);
router.get("/api/v1/users/:id", userController.getUser);
router.post("/api/v1/auth/signup", userController.createUser);
router.post("/api/v1/auth/signin", authController.signin);
router.delete("/api/v1/users/:id", userController.deleteUser);
router.get("/api/v1/accounts", accountController.getAllAccounts);
router.post("/api/v1/accounts", accountController.createAccount);
router.get("/api/v1/accounts/:id", accountController.getAccount);
router.delete("/api/v1/accounts/:id", accountController.deleteAccount);
router.patch("/api/v1/accounts/:id", accountController.activateAccount);
router.get("/api/v1/transactions", transactionController.getAll);
router.post("/api/v1/transactions/:acc/debit", transactionController.debitAccount);
router.post("/api/v1/transactions/:acc/credit", transactionController.creditAccount);
router.get("/api/v1/signout", authController.signout);

export default router;