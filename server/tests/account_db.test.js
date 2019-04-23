import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

chai.use(chaiHttp);
chai.should();

let accountCreated = 0;
describe("Test account from db", () => {
    describe("POST /", () => {
        it("it should create a user account", done => {
            const acc = {
                email: "juliushirwa@gmail.com",
                type: "current"
            };
            chai.request(app)
                .post(`/api/v2/accounts`)
                .send(acc)
                .end((err, res) => {
                    res.should.have.status(201);
                    accountCreated = res.body.data.accountNumber;
                    done();
                });
        });
        it("it should return an error if user not found", done => {
            const acc = {
                email: "juliushirw@gmail.com",
                type: "current"
            };
            chai.request(app)
                .post(`/api/v2/accounts`)
                .send(acc)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe("GET /", () => {
        it("should return user all accounts", done => {
            const email = "juliushirwa@gmail.com";
            chai.request(app)
                .get(`/api/v2/user/${email}/accounts`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                }); 
        });

        it("should return all accounts", done => {
            chai.request(app)
                .get(`/api/v2/accounts`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                }); 
        });
    });

    describe("PUT /", () => {
        it("should activate or deactivate a user account", done => {
            const acc = {
                status: "active"
            };
            const accountNumber = accountCreated;
            chai.request(app)
                .put(`/api/v2/account/${accountNumber}`)
                .send(acc)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("DELETE /", () => {
        it("it should delete an existing account", done => {
            const accountNumber = accountCreated;
            chai.request(app)
                .delete(`/api/v2/account/${accountNumber}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});