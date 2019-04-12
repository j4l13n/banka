import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';
import accountdb from './../mockdb/account';

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe("Transactions", () => {
    describe("POST /", () => {
        it("it should return an object of an account from db", done => {
            let account = "1233";
            chai.request(app)
                .post(`/api/v1/transactions/${account}/debit`)
                .send({ cashier: 1, amount: 5000, })
                .end((err, res) => {
                    const getAccount = accountdb.find(account => account.accountNumber === account);
                    expect(getAccount).should.be.an('object');
                    done();
                });
        });

        // it("it should return account found response", done => {
        //     let account = "1233";
        //     chai.request(app)
        //         .post(`/api/v1/transactions/${account}/debit`)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             done();
        //         });
        // });

        it("it should return an error when account not found", done => {
            let account = "123444";
            chai.request(app)
                .post(`/api/v1/transactions/${account}/debit`)
                .send({ cashier: 1, amount: 5000, })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('message').eql('Account not found');
                    done();
            });
        });

        it("it should return a response when an account is not found", done => {
            let account = "1234";
            chai.request(app)
                .post(`/api/v1/transactions/${account}/debit`)
                .send({ cashier: 1, amount: 5000, })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message');
                    done();
                });
        });

        // it("it should return an error when amount not specified", done => {
        //     let account = "1233";
        //     chai.request(app)
        //         .post(`/api/v1/transactions/${account}/debit`)
        //         .send({ cashier: 1, })
        //         .end((err, res) => {
        //             res.should.have.status(400);
        //             res.body.should.be.an('object');
        //             res.body.should.have.property('error');
        //             done();
        //         });
        // });

        // it("it should return an error when cashier not specified", done => {
        //     let account = "1233";
        //     chai.request(app)
        //         .post(`/api/v1/transactions/${account}/debit`)
        //         .send({ amount: 5000 })
        //         .end((err, res) => {
        //             res.should.have.status(400);
        //             res.body.should.be.an('object');
        //             res.body.should.have.property('error');
        //             done();
        //         });
        // });
    });

    describe("GET /", () => {
        it("it should return all transactions", done => {
            chai.request(app)
                .get(`/api/v1/transactions`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                done();
            });
        });
    });
});