import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

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
                id : 2,
                accountNumber: "12334567898765",
                createOn: Date.now(),
                owner: 1,
                type: "Current",
                status: "active",
                balance: 200000.0
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
    });

    // Tests for update an account
    /* describe("PUT/:id Accounts", () => {
        it("it should update an account when id is found", (done) => {
            let id = 1;
            chai.request(app)
                .put(`/api/v1/accounts/${id}`)
                .send({ })
        });
    }); */
});