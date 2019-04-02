import express from 'express';
import userController from './../Controllers/users';
import accountController from './../Controllers/accounts';

const router = express.Router();

router.get("/api/v1/users", userController.getAllUsers);
router.get("/api/v1/users/:id", userController.getUser);
router.post("/auth/signup", userController.createUser);
router.put("/api/v1/users/:id", userController.updateUser);
router.delete("/api/v1/users/:id", userController.deleteUser);
router.get("/api/v1/accounts", accountController.getAllAccounts);
router.post("/accounts", accountController.createAccount);
router.get("/api/v1/accounts/:id", accountController.getAccount);

export default router;