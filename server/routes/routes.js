import { Router } from 'express';
import checkUser from './protect';
import 'babel-polyfill';
import userControllerDb from './../controllers/users';
import dotenv from 'dotenv';
import accountControllerDb from './../controllers/accounts';
import transactionControllerDb from './../controllers/transactions';

dotenv.config();

const router = Router();

// banka version 2 api routes
router.post("/api/v2/auth/signup", userControllerDb.signup);
router.post("/api/v2/auth/signin", userControllerDb.signin);
router.get("/api/v2/users", userControllerDb.getAll);
router.post("/api/v2/accounts", accountControllerDb.create);
router.put("/api/v2/account/:accountNumber", accountControllerDb.activateOrDeactivate);
router.delete("/api/v2/account/:accountNumber", accountControllerDb.deleteAccount);
router.post("/api/v2/transactions/:accountNumber/debit", transactionControllerDb.debit);
router.post("/api/v2/transactions/:accountNumber/credit", transactionControllerDb.credit);
router.get("/api/v2/accounts/:accountNumber/transactions", transactionControllerDb.userHistory);
router.get("/api/v2/transactions/:id", transactionControllerDb.getTransaction);
router.get("/api/v2/user/:email/accounts", accountControllerDb.viewAccounts);
router.get("/api/v2/accounts", accountControllerDb.getAll);


export default router;