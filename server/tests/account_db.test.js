import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

chai.use(chaiHttp);
chai.should();

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
});