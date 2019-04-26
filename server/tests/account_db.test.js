import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';
import Db from './../db/index';
import { doesNotReject } from 'assert';

chai.use(chaiHttp);
chai.should();
const { expect } = chai; 

const baseUrl = `/api/v2/`;
let token = ``;
let adminToken = ``;
let fakeToken = `alepfr239847hjg`;
let cashierToken = ``;

describe("Test all accounts routes", () => {
    describe("POST /accounts", () => {
        it("should create new admin", done => {
            const user = {
                email: "hirwa@gmail.com",
                firstname: "hirwa",
                lastname: "julien",
                password: "Regedit56",
                type: "admin"
            };
            chai.request(app)
            .post(`${baseUrl}auth/admin`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                adminToken = res.body.data.token;
                done();
            });
        });

        it("should create new cashier", done => {
            const user = {
                email: "newcashier@gmail.com",
                firstname: "hirwa",
                lastname: "julien",
                password: "Regedit56",
                type: "cashier"
            };
            chai.request(app)
            .post(`${baseUrl}auth/admin`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                cashierToken = res.body.data.token;
                done();
            });
        });

        it("should return all status found", done => {
            chai.request(app)
                .get(`${baseUrl}accounts?status=active`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("it should login a user", done => {
            const user = {
                email: "hirwa@gmail.com",
                password: "Regedit56"
            };
            chai.request(app)
                .post(`${baseUrl}auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    token = res.body.data.token;
                    done();
                });
        });

        it("it should create a user account", done => {
            const account = {
                type: "current"
            };
            chai.request(app)
                .post(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + token)
                .send(account)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("it should return an error when password is not correct", done => {
            const user = {
                email: "hirwa@gmail.com",
                password: "Regedit5"
            };
            chai.request(app)
                .post(`${baseUrl}auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when not email from token on user accounts", done => {
            chai.request(app)
                .get(`${baseUrl}user/accounts`)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it("should return account not found when user has no accounts", done => {
            chai.request(app)
                .get(`${baseUrl}user/accounts`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should return account not found when user has no accounts", done => {
            chai.request(app)
                .get(`${baseUrl}user/accounts`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should return specified email by admin", done => {
            const  email = "hirwa@gmail.com";
            chai.request(app)
                .get(`${baseUrl}user/${email}/accounts`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should return all accounts from database", done => {
            chai.request(app)
                .get(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should get one specific user accounts", done => {
            chai.request(app)
                .get(`${baseUrl}user/accounts`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should get token error for forbidden", done => {
            chai.request(app)
                .get(`${baseUrl}user/accounts`)
                .set("Authorization", "Bearer " + fakeToken)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it("should get token error for forbidden", done => {
            chai.request(app)
                .get(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + fakeToken)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it("should get token error when not allowed", done => {
            chai.request(app)
                .get(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });

        it("should not allow other users to credit", done => {
            const account = {
                amount: 2000
            };
            const accountNumber = "100000";
            chai.request(app)
                .post(`${baseUrl}transactions/${accountNumber}/credit`)
                .set("Authorization", "Bearer " + adminToken)
                .send(account)
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });

        it("should return a 404 for all unknown routes", done => {
            chai.request(app)
                .get(`${baseUrl}hello`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should return a 200 for all main route", done => {
            chai.request(app)
                .get(`/`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should return a 404 for all unknown routes", done => {
            chai.request(app)
                .post(`${baseUrl}hello`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should return a 404 for all unknown routes", done => {
            chai.request(app)
                .put(`${baseUrl}hello`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should return a 404 for all unknown routes", done => {
            chai.request(app)
                .delete(`${baseUrl}hello`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should return a 404 for all unknown routes", done => {
            chai.request(app)
                .patch(`${baseUrl}hello`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should not allow other users to credit", done => {
            const account = {
                amount: 2000
            };
            const accountNumber = "100000";
            chai.request(app)
                .post(`${baseUrl}transactions/${accountNumber}/credit`)
                .set("Authorization", "Bearer " + fakeToken)
                .send(account)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

    });
















    describe("drop all tables files", () => {
        it("it should drop transactions table", () => {
            Db.query("DELETE FROM transactions WHERE id > 1");
            Db.query("DELETE FROM accounts WHERE id > 1");
            Db.query("DELETE FROM users");
        });
    });
    
});