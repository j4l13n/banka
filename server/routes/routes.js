import { Router } from 'express';
import userController from './../Controllers/users';
import accountController from './../Controllers/accounts';
import transactionController from './../Controllers/transactions';
import authController from './../Controllers/auth';
import checkUser from './protect';
import 'babel-polyfill';
import userControllerDb from './../controllers/users';
import dotenv from 'dotenv';
import accountControllerDb from './../controllers/accounts';

dotenv.config();

const router = Router();

// banka version 1 api routes
router.get("/api/v1/users", checkUser, userController.getAllUsers);
router.get("/api/v1/users/:id", userController.getUser);
router.post("/api/v1/auth/signup", userController.createUser);
router.post("/api/v1/auth/signin", authController.signin);
router.delete("/api/v1/users/:id", userController.deleteUser);
router.get("/api/v1/accounts", accountController.getAllAccounts);
router.post("/api/v1/accounts",  accountController.createAccount);
router.get("/api/v1/accounts/:id", accountController.getAccount);
router.delete("/api/v1/accounts/:id", accountController.deleteAccount);
router.patch("/api/v1/accounts/:id", accountController.activateAccount);
router.get("/api/v1/transactions", transactionController.getAll);
router.post("/api/v1/transactions/:acc/debit", transactionController.debitAccount);
router.post("/api/v1/transactions/:acc/credit", transactionController.creditAccount);
router.get("/api/v1/signout", authController.signout);

// banka version 2 api routes
router.post("/api/v2/auth/signup", userControllerDb.signup);
router.post("/api/v2/auth/signin", userControllerDb.signin);
router.get("/api/v2/users", userControllerDb.getAll);
router.post("/api/v2/accounts", accountControllerDb.create);
router.put("/api/v2/account/:accountNumber", accountControllerDb.activateOrDeactivate);
router.delete("/api/v2/account/:accountNumber", accountControllerDb.deleteAccount);


export default router;