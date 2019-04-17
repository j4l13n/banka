import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';
import userdb from './../mockdb/account';

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Accounts", () => {

    // Test to get all accounts records
    describe("GET / Accounts", () => {
        it("it should return all accounts", (done) => {
            chai.request(app)
                .get("/api/v1/accounts")
                .end((err, res) => {
                    res.should.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("it should return an account if found", (done) => {
            const id = 1;
			chai.request(app)
				.get(`/api/v1/accounts/${id}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
        });

        it("it should return an error if account not found", (done) => {
            const id = 4;
			chai.request(app)
				.get(`/api/v1/accounts/${id}`)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
					done();
				});
        });
    });

    // Test to open new account
    describe("POST / Accounts", () => {
        it("it should post a user bank account", (done) => {
            let account = {
                owner: 109605343276,
                type: "current",
            };

            chai.request(app)
                .post('/api/v1/accounts')
                .send(account)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('account created successfully.');
                    done();
                });
        });

        it("it should return an error if account is string", (done) => {
            let account = {
                owner: "10960kl43276",
                type: "current",
            };

            chai.request(app)
                .post('/api/v1/accounts')
                .send(account)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("it should return an error if type is not current or savings", (done) => {
            let account = {
                owner: 109605343276,
                type: "currentsll",
            };

            chai.request(app)
                .post('/api/v1/accounts')
                .send(account)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    // Tests for update an account
    describe("PUT/:id Accounts", () => {
        it("it should activate an account", (done) => {
            let id = 1233;
            chai.request(app)
                .patch(`/api/v1/accounts/${id}`)
                .send({ status: "active" })
                .end((err, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    done();
                });
        });

        it("it should return an error whe account not found", (done) => {
            let id = 5;
            chai.request(app)
                .patch(`/api/v1/accounts/${id}`)
                .send({ status: "active" })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        }); 
    });

    // Tests for delete account
    describe("DELETE / Account", () => {
        it("it should return response when an account is deleted", done => {
            let id = 1233;
            chai.request(app)
                .delete(`/api/v1/accounts/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Account successfully deleted');
                    done();
                });
        });

        it("it should return an error when an account is not available", done => {
            let id = 5;
            chai.request(app)
                .delete(`/api/v1/accounts/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('Account not found');
                    done();
                });
        });
    });
});