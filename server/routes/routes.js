let express = require('express');
let modkdb = require('./../mockdb/user');
let userController = require('../Controllers/users');

const router = express.Router();

router.get("/api/v1/users", userController.getAllUsers);
router.get("/api/v1/user/:id", userController.getUser);
router.post("/api/v1/users", userController.createUser);

module.exports = router;