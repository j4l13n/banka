let userdb = require('../mockdb/user');

class UsersController {
    getAllUsers(req, res) {
        return res.status(200).send({
            status: 200,
            message: 'users retrieved successfully',
            data: userdb,
        });
    }

    getUser(req, res) {
        const id = parseInt(req.params.id, 10);
        userdb.map(user => {
            if(user.id == id) {
                return res.status(200).send({
                    status: 200,
                    message: 'user retrieved successfully',
                    user,
                });
            }
        });
    }

    createUser(req, res) {
        if(!req.body.firstname) {
            return res.status(400).send({
                status: 400,
                message: "firstname is required",
            });
        } else if(!req.body.lastname) {
            return res.status(400).send({
                status: 400,
                message: "lastname is required",
            });
        } else if(!req.body.email) {
            return res.status(400).send({
                status: 400,
                message: "email is required",
            });
        } else if(!req.body.password) {
            return res.status(400).send({
                status: 400,
                message: "password is required",
            })
        }

        const user = {
            id: userdb.length + 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            type: "client",
            isAdmin: false
        }

        userdb.push(user);
        return res.status(201).send({
            status: 201,
            message: 'user added successfully',
        })
    }
}

const userController = new UsersController();
module.exports = userController;