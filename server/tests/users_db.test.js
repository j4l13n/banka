import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

chai.use(chaiHttp);
chai.should();

describe("Users from database", () => {
    describe("POST /", () => {
        it("it should signup a user and save to database", done => {
            const newUser = {
                firstname: "Ishimo",
                lastname: "Bertrand",
                email: "ishimo@gmail.com",
                password: "regedit56"
            };
            chai.request(app)
                .post(`/api/v2/auth/signup`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("it should return an error if email exists", done => {
            const newUser = {
                firstname: "Ishimo",
                lastname: "Bertrand",
                email: "bertrand@gmail.com",
                password: "regedit56"
            };
            chai.request(app)
                .post(`/api/v2/auth/signup`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should login a user", done => {
            const user = {
                email: "juliushirwa@gmail.com",
                password: "regedit56"
            };
            chai.request(app)
                .post(`/api/v2/auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("should not login a user if user not found", done => {
            const user = {
                email: "julius@gmail.com",
                password: "regedit"
            };
            chai.request(app)
                .post(`/api/v2/auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should not login a user if password is incorrect", done => {
            const user = {
                email: "juliushirwa@gmail.com",
                password: "regedit"
            };
            chai.request(app)
                .post(`/api/v2/auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    }); 

    describe("GET /", () => {
        it("it should return all users", done => {
            chai.request(app)
                .get(`/api/v2/users`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});