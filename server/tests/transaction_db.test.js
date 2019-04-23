import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

chai.use(chaiHttp);
chai.should();

describe("Test transactions db", () => {
    describe("POST /", () => {
        it("should debit for a specific account", done => {
            const trans = {
                email: "juliushirwa@gmail.com",
                amount: 200
            };
            const acc = 67603393;
            chai.request(app)
                .post(`/api/v2/transactions/${acc}/debit`)
                .send(trans)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("should return an error when email not found", done => {
            const trans = {
                email: "juliushirw@gmail.com",
                amount: 200
            };
            const acc = 67603393;
            chai.request(app)
                .post(`/api/v2/transactions/${acc}/debit`)
                .send(trans)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return an error when account number not found", done => {
            const trans = {
                email: "juliushirwa@gmail.com",
                amount: 200
            };
            const acc = 6760339377;
            chai.request(app)
                .post(`/api/v2/transactions/${acc}/debit`)
                .send(trans)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return error when amount is bigger than the balance", done => {
            const trans = {
                email: "juliushirwa@gmail.com",
                amount: 5000000
            };
            const acc = 67603393;
            chai.request(app)
                .post(`/api/v2/transactions/${acc}/debit`)
                .send(trans)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should credit for a specific account", done => {
            const trans = {
                email: "juliushirwa@gmail.com",
                amount: 200
            };
            const acc = 67603393;
            chai.request(app)
                .post(`/api/v2/transactions/${acc}/credit`)
                .send(trans)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("should credit for a specific account", done => {
            const trans = {
                email: "juliushirwa@gmail.com",
                amount: 200
            };
            const acc = 6760336666;
            chai.request(app)
                .post(`/api/v2/transactions/${acc}/credit`)
                .send(trans)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should credit for a specific account", done => {
            const trans = {
                email: "juliushirw@gmail.com",
                amount: 200
            };
            const acc = 67603393;
            chai.request(app)
                .post(`/api/v2/transactions/${acc}/credit`)
                .send(trans)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("GET /", () => {
        it("should get all transaction history for a specific account number", () => {
            const email = "juliushirwa@gmail.com";
            const accountNumber = 67603393;
            chai.request(app)
                .get(`/api/v2/accounts/${accountNumber}/transactions`)
                .send(email)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should return an error if email not specified or not found", () => {
            const email = "juliushi@gmail.com";
            const accountNumber = 67603393;
            chai.request(app)
                .get(`/api/v2/accounts/${accountNumber}/transactions`)
                .send(email)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});