import { Router } from 'express';
import protect from './protect';
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
router.post("/api/v2/auth/admin", userValidate.validateAdminSignup, userControllerDb.createStaff);
router.post("/api/v2/auth/signin", userValidate.validateSignin, userControllerDb.signin);
router.get("/api/v2/users", protect.checkAdmin, userControllerDb.getAll);
router.post("/api/v2/accounts", protect.checkUser, accountValidate.createValidate, accountControllerDb.create);
router.patch("/api/v2/account/:accountNumber", accountValidate.updateValidate, accountControllerDb.activateOrDeactivate);
router.delete("/api/v2/account/:accountNumber", protect.checkAdmin, accountValidate.deleteValidate, accountControllerDb.deleteAccount);
router.post("/api/v2/transactions/:accountNumber/debit", protect.checkCashier, transactionValidate.debitValidate, transactionControllerDb.debit);
router.post("/api/v2/transactions/:accountNumber/credit", protect.checkCashier, transactionValidate.creditValidate, transactionControllerDb.credit);
router.get("/api/v2/accounts/:accountNumber/transactions", protect.checkUser, transactionValidate.accountNumberValidate, transactionControllerDb.userHistory);
router.get("/api/v2/transactions/:id", protect.checkUser, transactionValidate.idValidate, transactionControllerDb.getTransaction);
router.get("/api/v2/user/:email/accounts", protect.checkAdminOrStaff, transactionValidate.emailIsValid, accountControllerDb.viewAccounts);
router.get("/api/v2/accounts", protect.checkAdmin, accountControllerDb.getAll);
router.get("/api/v2/user/accounts", protect.checkUser, accountControllerDb.viewUserAccounts);


export default router;