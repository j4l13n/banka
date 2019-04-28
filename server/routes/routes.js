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

/**
 * this is version 2 of Andela Developer Challenge
 * Technologies:
 * - postgresql
 * - nodejs with express framework
 * - git and github for version control
 */

/**
 * @swagger
 * /auth/signup:
 *  post:
 *      tags:
 *          - users
 *      descriptions: Creates a new user
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: body
 *            description: user object
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/signup'
 *      responses:
 *          201:
 *              description: Successfully created
 */
/**
 * @swagger
 * definition:
 *  signup:
 *      properties:
 *          firstname:
 *              type: string
 *          lastname:
 *              type: string
 *          email: 
 *              type: string
 *          password: 
 *              type: string
 */
router.post("/api/v2/auth/signup", userValidate.validateSignup, userControllerDb.signup);
/**
 * @swagger
 * /auth/admin:
 *  post:
 *      tags:
 *          - admin
 *      descriptions: Creates a new user
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: body
 *            description: admin object
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/admin'
 *      responses:
 *          201:
 *              description: Successfully created
 */
/**
 * @swagger
 * definition:
 *  admin:
 *      properties:
 *          firstname:
 *              type: string
 *          lastname:
 *              type: string
 *          email: 
 *              type: string
 *          password: 
 *              type: string
 *          type:
 *              type: string
 */
router.post("/api/v2/auth/admin", userValidate.validateAdminSignup, userControllerDb.createStaff);
/**
 * @swagger
 * /auth/signin:
 *  post:
 *      tags:
 *          - users
 *      descriptions: Creates a new user
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: body
 *            description: user object
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/signin'
 *      responses:
 *          201:
 *              description: Successfully logged in
 */
/**
 * @swagger
 * definition:
 *  signin:
 *      properties:
 *          email: 
 *              type: string
 *          password: 
 *              type: string
 */
router.post("/api/v2/auth/signin", userValidate.validateSignin, userControllerDb.signin);
/**
 * @swagger
 * /users:
 *  get:
 *      tags:
 *          - admin
 *      descriptions: fetch all users
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: authorization
 *            in: header
 *            type: string
 *            description: Add Bearer Token
 *            required: true
 *            schema:
 *              $ref: '#/definitions/fetch'
 *      responses:
 *          200:
 *              description: all data fetched
 *          401:
 *              description: you are not authorized to access this endpoint api.
 */
/**
 * @swagger
 * definition:
 *  users:
 *      properties:
 *          email:
 *              type: string
 *          isadmin:
 *              type: string
 *          type:
 *              type: string    
 */
router.get("/api/v2/users", protect.checkAdmin, userControllerDb.getAll);
/**
 * @swagger
 * /accounts:
 *  post:
 *      tags:
 *          - users/admin/staff
 *      descriptions: user can create an account
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: authorization
 *            in: header
 *            type: string
 *            description: Add Bearer Token
 *          - name: body
 *            in: body
 *            type: string
 *            description: account object
 *            required: true
 *            schema:
 *              $ref: '#/definitions/account'
 *      responses:
 *          201:
 *              description: The account created successfully
 *          401:
 *              description: you are not allowed to create an account
 *          400:
 *              description: all field are required
 */
/**
 * @swagger
 * definitions:
 *  accounts:
 *      properties:
 *          type:
 *              type: string
 */
router.post("/api/v2/accounts", protect.checkUser, accountValidate.createValidate, accountControllerDb.create);
/**
 * @swagger
 * /account/{accountNumber}:
 *  patch:
 *      tags:
 *          - admin/staff
 *      descriptions: activate or deactivate account
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: accountNumber
 *            in: path
 *            required: true
 *            description: account number
 *            type: integer
 *          - name: authorization
 *            in: header
 *            description: Add Bearer Token
 *            type: string
 *      responses:
 *          200:
 *              description: account was activated or deactivated successfully
 *          401:
 *              description: you must first login or signup to access this link
 *          404:
 *              description: the account was not found to be activated or deactivated
 */
router.patch("/api/v2/account/:accountNumber", protect.checkAdmin, accountValidate.updateValidate, accountControllerDb.activateOrDeactivate);
/**
 * @swagger
 * /account/{accountNumber}:
 *  delete:
 *      tags:
 *          - admin/staff
 *      descriptions: delete an account
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: accountNumber
 *            in: path
 *            required: true
 *            description: account number
 *            type: integer
 *          - name: authorization
 *            in: header
 *            description: Add Bearer Token
 *            type: string
 *      responses:
 *          200:
 *              description: account was deleted successfully
 *          401:
 *              description: you must first login or signup to access this link
 *          404:
 *              description: the account was not found to be deleted
 */
router.delete("/api/v2/account/:accountNumber", protect.checkAdmin, accountValidate.deleteValidate, accountControllerDb.deleteAccount);
/**
 * @swagger
 * /transactions/{accountNumber}/debit:
 *  post:
 *      tags:
 *          - staff
 *      descriptions: admin/staff can debit
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: authorization
 *            in: header
 *            type: string
 *            description: Add Bearer Token
 *            required: true
 *            schema:
 *              $ref: '#/definitions/transaction'
 *      responses:
 *          201:
 *              description: the transaction successfully created
 *          401:
 *              description: you are not allowed to access this endpoint, only staff and admin can
 *          404:
 *              description: the account provided was not found
 *          
 */
router.post("/api/v2/transactions/:accountNumber/debit", protect.checkCashier, transactionValidate.debitValidate, transactionControllerDb.debit);
/**
 * @swagger
 * /transactions/{accountNumber}/credit:
 *  post:
 *      tags:
 *          - staff
 *      descriptions: admin/staff can credit
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: authorization
 *            in: header
 *            type: string
 *            description: Add Bearer Token
 *            required: true
 *            schema:
 *              $ref: '#/definitions/transaction'
 *      responses:
 *          201:
 *              description: the transaction successfully created
 *          401:
 *              description: you are not allowed to access this endpoint, only staff and admin can
 *          404:
 *              description: the account provided was not found
 *          
 */
router.post("/api/v2/transactions/:accountNumber/credit", protect.checkCashier, transactionValidate.creditValidate, transactionControllerDb.credit);
/**
 * @swagger
 * /accounts/{accountNumber}/transactions:
 *  get:
 *      tags:
 *          - users
 *      descriptions: fetch all user transactions
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: accountNumber
 *            in: path
 *            required: true
 *            description: transaction id
 *            type: integer
 *          - name: authorization
 *            in: header
 *            description: Add Bearer Token
 *            type: string
 *      responses:
 *          200:
 *              description: transaction successfully found
 *          401:
 *              description: you must first login or signup
 *          404:
 *              description: the transaction with account number provided was not found
 */
router.get("/api/v2/accounts/:accountNumber/transactions", protect.checkUser, transactionValidate.accountNumberValidate, transactionControllerDb.userHistory);
/**
 * @swagger
 * /transactions/{id}:
 *  get:
 *      tags:
 *          - users
 *      descriptions: fetch one transactions
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            description: transaction id
 *            type: integer
 *          - name: authorization
 *            in: header
 *            description: Add Bearer Token
 *            type: string
 *      responses:
 *          200:
 *              description: transaction successfully found
 *          401:
 *              description: you must first login or signup
 *          404:
 *              description: the transaction with id provided was not found
 */
router.get("/api/v2/transactions/:id", protect.checkUser, transactionValidate.idValidate, transactionControllerDb.getTransaction);
/**
 * @swagger
 * /user/{email}/accounts:
 *  get:
 *      tags:
 *          - admin/staff
 *      descriptions: fetch all user's accounts
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: authorization
 *            in: header
 *            type: string
 *            description: Token gotten from login or signup is placed in authorization
 *            required: true
 *          - name: email
 *            in: path
 *            type: string
 *            required: true
 *            description: The email of the user is placed in the path
 *            schema:
 *              $ref: '#/definitions/accounts'
 *      responses:
 *          200: 
 *              description: all user accounts have found
 *          401:
 *              description: you are not allowed to access this endpoint api
 *          403:
 *              description: only staff and admin user's must be able to see the endpoint
 *          404:
 *              description: the use email specified is not found the system
 */
/**
 * @swagger
 * definitions:
 *  accounts:
 *      email: 
 *          type: string
 */
router.get("/api/v2/user/:email/accounts", protect.checkAdminOrStaff, transactionValidate.emailIsValid, accountControllerDb.viewAccounts);
/**
 * @swagger
 * /accounts:
 *  get:
 *      tags:
 *          - admin/staff
 *      descriptions: fetch all accounts
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: authorization
 *            in: header
 *            type: string
 *            description: Token gotten from login or sign up is placed in authorization
 *            required: true
 *      responses:
 *          200:
 *              description: all accounts fetched
 *          401:
 *              description: you are not authorized to access this endpoint api.
 */
router.get("/api/v2/accounts", protect.checkAdmin, accountControllerDb.getAll);
/**
 * @swagger
 * /user/accounts:
 *  get:
 *      tags:
 *          - users
 *      descriptions: get all user account numbers
 *      produces: 
 *          - application/json
 *      parameters:
 *          - name: authorization
 *            in: header
 *            description: Token gotten from login or sign up is placed in authorization
 *            type: string
 *            required: true
 *            schema:
 *              $ref: '#/definitions/fetch'
 *      responses:
 *          200:
 *              description: all accounts fetched
 *          401:
 *              description: you must first login or signup
 *          404:
 *              description: there no account for the provided user email
 *            
 */
router.get("/api/v2/user/accounts", protect.checkUser, accountControllerDb.viewUserAccounts);
/**
 * @swagger
 * /accounts/{accountNumber}:
 *  get:
 *      tags:
 *          - users
 *      descriptions: get an account
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: accountNumber
 *            in: path
 *            type: integer
 *            description: account object
 *            required: true
 *      responses:
 *          200:
 *              description: get a specific account details
 *          404:
 *              description: an account was not found
 */
router.get("/api/v2/accounts/:accountNumber", protect.checkUser, accountValidate.getAccountValidate, accountControllerDb.getAccount);

export default router;