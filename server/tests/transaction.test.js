import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import accountdb from '../mockdb/account';

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe("Transactions", () => {
    describe("POST /", () => {
        it("it should return an object of an account from db", done => {
            let account = "1233";
            chai.request(app)
                .post(`/api/v1/transactions/${account}/debit`)
                .send({ cashier: 1, amount: 5000 })
                .end((err, res) => {
                    const findOne = accountdb.find(acc => acc.accountNumber === account);
                    expect(findOne).should.be.an('object');
                    done();
                });
        });

        it("it should return not found when account is not valid", done => {
            let acc = "1234";
            chai.request(app)
                .post(`/api/v1/transactions/${acc}/debit`)
                .send({ cashier: 1, amount: 5000 })
                .end((err, res) => {
                    res.should.have.status(404);
                done();
            });
        });

        it("it should credit for a specific user account", done => {
            let acc = "1244";
            chai.request(app)
                .post(`/api/v1/transactions/${acc}/credit`)
                .send({ cashier: 1, amount: 5000 })
                .end((err, res) => {
                    res.should.have.status(200);
                done();
            });
        });

        it("it should return an error when amount not specified", done => {
            let acc = "1244";
            chai.request(app)
                .post(`/api/v1/transactions/${acc}/credit`)
                .send({ cashier: 1 })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    res.body.should.have.property('error');
                done();
            });
        });

        it("it should return an error when cashier  not specified", done => {
            let acc = "1244";
            chai.request(app)
                .post(`/api/v1/transactions/${acc}/credit`)
                .send({ amount: 50000 })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    res.body.should.have.property('error');
                done();
            });
        });

        it("it should return an error when account not found", done => {
            let acc = "1255";
            chai.request(app)
                .post(`/api/v1/transactions/${acc}/credit`)
                .send({ cashier: 1, amount: 50000 })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an('object');
                done();
            });
        });

        it("it should return an error when debiting large amount", done => {
            let acc = "1244";
            chai.request(app)
                .post(`/api/v1/transactions/${acc}/debit`)
                .send({ cashier: 1, amount: 6000000 })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    res.body.should.have.property('error');
                done();
            });
        });

        it("it should debit an amount to a specific account", done => {
            let acc = "1244";
            chai.request(app)
                .post(`/api/v1/transactions/${acc}/debit`)
                .send({ cashier: 1, amount: 50000 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('data');
                done();
            });
        });

        it("it should return when amount not specified", done => {
            let acc = "1244";
            chai.request(app)
                .post(`/api/v1/transactions/${acc}/debit`)
                .send({ cashier: 1 })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    res.body.should.have.property('error');
                done();
            });
        });

        it("it should return when cashier not specified", done => {
            let acc = "1244";
            chai.request(app)
                .post(`/api/v1/transactions/${acc}/debit`)
                .send({ amount: 50000 })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    res.body.should.have.property('error');
                done();
            });
        });
    });

    // Test get request for transaction
    describe("GET /", () => {
        it("it should return all transactions", done => {
            chai.request(app)
                .get(`/api/v1/transactions`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('data');
                done();
            });
        });
    });
});