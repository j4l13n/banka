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
let accountN = 0;
let validToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhlbmdlZWVlQGdtYWlsLmNvbSIsInR5cGUiOiJjbGllbnQiLCJpc2FkbWluIjpmYWxzZSwiaWF0IjoxNTU2Mzk1Mzk3fQ.nDWordeNYNtZkiNTjRNm1kEIoKh07yDMupwJwUTQN1A`;
let accountId = 0;
let accountNTwo = 0;

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

        it("should return an error when an account is not valid", done => {
            const accountNumber = "123456j";
            chai.request(app)
                .get(`${baseUrl}accounts/${accountNumber}`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when an account is not valid", done => {
            const accountNumber = "123456j";
            chai.request(app)
                .delete(`${baseUrl}account/${accountNumber}`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when an account is not valid", done => {
            const accountNumber = "123456j";
            chai.request(app)
                .patch(`${baseUrl}account/${accountNumber}`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when an account is not valid", done => {
            const accountNumber = "123456";
            const status = {
                status: "ture"
            };
            chai.request(app)
                .patch(`${baseUrl}account/${accountNumber}`)
                .send(status)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when account type is not valid", done => {
            const type = {
                type: "nottype"
            };
            chai.request(app)
                .post(`${baseUrl}accounts`)
                .send(type)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when account type is not provided", done => {
            chai.request(app)
                .post(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should create an account for a user", done => {
            const type = {
                type: "current"
            };
            chai.request(app)
                .post(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + token)
                .send(type)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("should return an all user accounts", done => {
            chai.request(app)
                .get(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    accountN = res.body.data[0].accountnumber;
                    accountNTwo = res.body.data[1].accountnumber;
                    done();
                }); 
        });


        it("should activate an account from database", done => {
            let accountNumber = parseInt(accountN);
            const status = {
                status: "active"
            };
            chai.request(app)
                .patch(`${baseUrl}account/${accountNumber}`)
                .set("Authorization", "Bearer " + adminToken)
                .send(status)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        

        it("should create credit transaction for a specific account", done => {
            const accountNumber = parseInt(accountN);
            const amount = {
                amount: 1000
            };
            chai.request(app)
                .post(`${baseUrl}transactions/${accountNumber}/credit`)
                .set("Authorization", "Bearer " + cashierToken)
                .send(amount)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("should return an error when credit on invalid account number", done => {
            const accountNumber = "345kd";
            const amount = {
                amount: 1000
            };
            chai.request(app)
                .post(`${baseUrl}transactions/${accountNumber}/credit`)
                .set("Authorization", "Bearer " + cashierToken)
                .send(amount)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when credit on invalid amount", done => {
            const accountNumber = parseInt(accountN);
            const amount = {
                amount: "1000j"
            };
            chai.request(app)
                .post(`${baseUrl}transactions/${accountNumber}/credit`)
                .set("Authorization", "Bearer " + cashierToken)
                .send(amount)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when credit on amount not provided", done => {
            const accountNumber = parseInt(accountN);
            chai.request(app)
                .post(`${baseUrl}transactions/${accountNumber}/credit`)
                .set("Authorization", "Bearer " + cashierToken)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should create debit transaction for a specific account", done => {
            const accountNumber = parseInt(accountN);
            const amount = {
                amount: 100
            };
            chai.request(app)
                .post(`${baseUrl}transactions/${accountNumber}/debit`)
                .set("Authorization", "Bearer " + cashierToken)
                .send(amount)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("should get all transactions for a specific user account", done => {
            const accountNumber = parseInt(accountN);
            chai.request(app)
                .get(`${baseUrl}accounts/${accountNumber}/transactions`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    accountId = res.body.data[0].id;
                    done();
                });
        });

        it("should return not found error transactions for a specific user account", done => {
            const accountNumber = parseInt(accountN);
            chai.request(app)
                .get(`${baseUrl}accounts/${accountNumber}/transactions`)
                .set("Authorization", "Bearer " + validToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should return not found error transactions for a specific user account", done => {
            const accountNumber = "1204555";
            chai.request(app)
                .get(`${baseUrl}accounts/${accountNumber}/transactions`)
                .set("Authorization", "Bearer " + validToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should get one transaction for a user", done => {
            const id = parseInt(accountId);
            chai.request(app)
                .get(`${baseUrl}transactions/${id}`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should an error when id not found not found ", done => {
            const id = 100;
            chai.request(app)
                .get(`${baseUrl}transactions/${id}`)
                .set("Authorization", "Bearer " + validToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });


        it("should return an error when debit on invalid account number", done => {
            const accountNumber = "345kd";
            const amount = {
                amount: 1000
            };
            chai.request(app)
                .post(`${baseUrl}transactions/${accountNumber}/debit`)
                .set("Authorization", "Bearer " + cashierToken)
                .send(amount)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when debit on invalid amount", done => {
            const accountNumber = parseInt(accountN);
            const amount = {
                amount: "1000j"
            };
            chai.request(app)
                .post(`${baseUrl}transactions/${accountNumber}/debit`)
                .set("Authorization", "Bearer " + cashierToken)
                .send(amount)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when debit on amount not provided", done => {
            const accountNumber = parseInt(accountN);
            chai.request(app)
                .post(`${baseUrl}transactions/${accountNumber}/debit`)
                .set("Authorization", "Bearer " + cashierToken)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should fetch all transactions from database", done => {
            const accountNumber = parseInt(accountN);
            chai.request(app)
                .get(`${baseUrl}accounts/${accountNumber}/transactions`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should get all accounts", done => {
            chai.request(app)
                .get(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should return all transactions for an account number", done => {
            const accountNumber = parseInt(accountN);
            chai.request(app)
                .get(`${baseUrl}accounts/${accountNumber}/transactions`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should get details for a specific account number", done => {
            const accountNumber = parseInt(accountN);
            chai.request(app)
                .get(`${baseUrl}accounts/${accountNumber}`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        
        it("should return an error when not allowed", done => {
            const email = "hirwa@gmail.com";
            chai.request(app)
                .get(`${baseUrl}user/${email}/accounts`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                });
        });

        it("should return an error when account not found", done => {
            const accountNumber = 123456;
            chai.request(app)
                .get(`${baseUrl}accounts/${accountNumber}`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should return user has no account when not found", done => {
            chai.request(app)
                .get(`${baseUrl}user/accounts`)
                .set("Authorization", "Bearer " + cashierToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should return invalid url when status is not valid", done => {
            chai.request(app)
                .get(`${baseUrl}accounts?status=active.s`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should return all active accounts", done => {
            chai.request(app)
                .get(`${baseUrl}accounts?status=active`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should return an error when account not found to delete it", done => {
            const accountNumber = "12342";
            chai.request(app)
                .delete(`${baseUrl}account/${accountNumber}`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        }); 

        it("should return an error when account not found to activate", done => {
            const accountNumber = "12342";
            const status = {
                status: "active"
            };
            chai.request(app)
                .patch(`${baseUrl}account/${accountNumber}`)
                .set("Authorization", "Bearer " + adminToken)
                .send(status)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        }); 

        it("should return an error when account not found to activate", done => {
            const accountNumber = parseInt(accountN);
            const status = {
                status: "active"
            };
            chai.request(app)
                .patch(`${baseUrl}account/${accountNumber}`)
                .set("Authorization", "Bearer " + adminToken)
                .send(status)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when someone tries to create an account without login", done => {
            const type = {
                type: "savings"
            };
            chai.request(app)
                .post(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + validToken)
                .send(type)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should return an error when transaction has no such account provided", done => {
            const accountNumber = parseInt(accountNTwo);
            chai.request(app)
                .get(`${baseUrl}accounts/${accountNumber}/transactions`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        















        it("should delete an account", done => {
            const accountNumber = parseInt(accountN);
            chai.request(app)
                .delete(`${baseUrl}account/${accountNumber}`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should return invalid url when status is not valid", done => {
            chai.request(app)
                .get(`${baseUrl}accounts?status=active`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });


    });
















    describe("delete all tables files", () => {
        it("it should drop transactions table", () => {
            Db.query("DELETE FROM transactions WHERE id > 1");
        });

        it("it should delete all accounts", () => {
            Db.query("DELETE FROM accounts WHERE id > 1");
        });

        it("should return error when no account found", done => {
            Db.query("DELETE FROM accounts").then(result => {
                console.log(result.rows);
            });
            chai.request(app)
                .get(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should delete all users", () => {
            Db.query("DELETE FROM users");
        });
    });
    
});