import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Accounts", () => {
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
    });
});