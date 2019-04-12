import express from 'express';
import userController from './../Controllers/users';
import accountController from './../Controllers/accounts';
import transactionController from './../Controllers/transactions';
import authController from './../Controllers/auth';

const router = express.Router();


router.get("/api/v1/users", userController.getAllUsers);
router.get("/api/v1/users/:id", userController.getUser);
router.post("/api/v1/auth/signup", userController.createUser);
router.post("/api/v1/auth/signin", authController.signin);
// router.put("/api/v1/users/:id", userController.updateUser);
router.delete("/api/v1/users/:id", userController.deleteUser);
router.get("/api/v1/accounts", accountController.getAllAccounts);
router.post("/api/v1/accounts", accountController.createAccount);
router.get("/api/v1/accounts/:id", accountController.getAccount);
router.delete("/api/v1/accounts/:id", accountController.deleteAccount);
router.patch("/api/v1/accounts/:id", accountController.activateAccount);
router.get("/api/v1/transactions", transactionController.getAll);
router.post("/api/v1/transactions/:account/debit", transactionController.debitAccount);

export default router;