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
                .end((err, res) => {
                    res.should.have.status(404);
                done();
            });
        });

        it("it should credit for a specific user account", done => {
            let acc = "1233";
            chai.request(app)
                .post(`/api/v1/transactions/${acc}/credit`)
                .end((err, res) => {
                    res.should.have.status(200);
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