import { Router } from 'express';
import checkUser from './protect';
import 'babel-polyfill';
import userControllerDb from './../controllers/users';
import dotenv from 'dotenv';
import accountControllerDb from './../controllers/accounts';
import transactionControllerDb from './../controllers/transactions';
import userValidate from './../middlewares/users';
import accountValidate from './../middlewares/accounts';
import transactionValidate from './../middlewares/transactions';

dotenv.config();

const router = Router();

// banka version 2 api routes
router.post("/api/v2/auth/signup", userValidate.validateSignup, userControllerDb.signup);
router.post("/api/v2/auth/signin", userValidate.validateSignin, userControllerDb.signin);
router.get("/api/v2/users", userControllerDb.getAll);
router.post("/api/v2/accounts", accountValidate.createValidate, accountControllerDb.create);
router.patch("/api/v2/account/:accountNumber", accountValidate.updateValidate, accountControllerDb.activateOrDeactivate);
router.delete("/api/v2/account/:accountNumber", accountValidate.deleteValidate, accountControllerDb.deleteAccount);
router.post("/api/v2/transactions/:accountNumber/debit", transactionValidate.debitValidate, transactionControllerDb.debit);
router.post("/api/v2/transactions/:accountNumber/credit", transactionValidate.creditValidate, transactionControllerDb.credit);
router.get("/api/v2/accounts/:accountNumber/transactions", transactionValidate.accountNumberValidate, transactionControllerDb.userHistory);
router.get("/api/v2/transactions/:id", transactionValidate.idValidate, transactionControllerDb.getTransaction);
router.get("/api/v2/user/:email/accounts", transactionValidate.emailIsValid, accountControllerDb.viewAccounts);
router.get("/api/v2/accounts", accountControllerDb.getAll);


export default router;