import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

chai.use(chaiHttp);
chai.should();
const baseUrl = `/api/v2/`;
let token = ``;
let adminToken = ``;
let fakeToken = `alepfr239847hjg`;
let cashierToken = ``;
let accountN = 0;

describe("Transaction test", () => {

    describe("POST /accounts", () => {
        it("should create new admin", done => {
            const user = {
                email: "hirwa2@gmail.com",
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
                email: "another@gmail.com",
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
                email: "another@gmail.com",
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

        it("should return an error when email is not valid is parameter", done => {
            const email = "julien@gmailcom";
            chai.request(app)
                .get(`${baseUrl}user/${email}/accounts`)
                .set("Authorization", "Bearer " + cashierToken)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when it not cashier nor admin", done => {
            const email = "julien@gmailcom";
            chai.request(app)
                .get(`${baseUrl}user/${email}/accounts`)
                .set("Authorization", "Bearer " + fakeToken)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it("should return an error when accounts not found", done => {
            const email = "another@gmail.com";
            chai.request(app)
                .get(`${baseUrl}user/${email}/accounts`)
                .set("Authorization", "Bearer " + cashierToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });



        it("should return an error when id is not provided", done => {
            let id = `39j`;
            chai.request(app)
                .get(`${baseUrl}transactions/${id}`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        
        it("should return an error when id is not provided", done => {
            const accountNumber = "je34556";
            chai.request(app)
                .get(`${baseUrl}accounts/${accountNumber}/transactions`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return when account type is not valid before creating", done => {
            let acc = {
                type: "dhei"
            };
            chai.request(app)
                .post(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + token)
                .send(acc)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return when type is not provided before creating", done => {
            chai.request(app)
                .post(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return error when no account found", done => {
            chai.request(app)
                .get(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + adminToken)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should return an error when transaction not found", done => {
            const id = 100;
            chai.request(app)
                .get(`${baseUrl}transactions/${id}`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should return not found error transactions for a specific user account", done => {
            const accountNumber = "10000000";
            chai.request(app)
                .get(`${baseUrl}accounts/${accountNumber}/transactions`)
                .set("Authorization", "Bearer " + token)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

    });
});