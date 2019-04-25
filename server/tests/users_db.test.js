import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';
import Db from './../db/index';

chai.use(chaiHttp);
chai.should();
const { expect } = chai; 

const baseUrl = `/api/v2/`;

describe("Test all users routes", () => {
    describe("POST /user", () => {
        it("it should return an error when admin type not specified", done => {
            const user = {
                firstname: "hirwa",
                lastname: "julien",
                email: "julien@gmail.com",
                password: "Regedit56",
                type: "hello"
            };
            chai.request(app)
                .post(`${baseUrl}auth/admin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when  password is not valid", done => {
            const user = {
                firstname: "hirwa",
                lastname: "julien",
                email: "julien@gmail.com",
                password: "Regedit",
                type: "admin"
            };
            chai.request(app)
                .post(`${baseUrl}auth/admin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when  email is not valid", done => {
            const user = {
                firstname: "hirwa",
                lastname: "julien",
                email: "julien@gmailcom",
                password: "Regedit56",
                type: "admin"
            };
            chai.request(app)
                .post(`${baseUrl}auth/admin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when  lastname is not valid", done => {
            const user = {
                firstname: "hirwa",
                lastname: "julien56",
                email: "julien@gmailcom",
                password: "Regedit56",
                type: "admin"
            };
            chai.request(app)
                .post(`${baseUrl}auth/admin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when  firstname is not valid", done => {
            const user = {
                firstname: "hirwa55",
                lastname: "julien",
                email: "julien@gmailcom",
                password: "Regedit56",
                type: "admin"
            };
            chai.request(app)
                .post(`${baseUrl}auth/admin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when type not specified", done => {
            const user = {
                firstname: "hirwa55",
                lastname: "julien",
                email: "julien@gmailcom",
                password: "Regedit56",
            };
            chai.request(app)
                .post(`${baseUrl}auth/admin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when password is not specified", done => {
            const user = {
                firstname: "hirwa55",
                lastname: "julien",
                email: "julien@gmail.com",
                type: "admin"
            };
            chai.request(app)
                .post(`${baseUrl}auth/admin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when  email not specified", done => {
            const user = {
                firstname: "hirwa55",
                lastname: "julien",
                password: "Regedit56",
                type: "admin"
            };
            chai.request(app)
                .post(`${baseUrl}auth/admin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when  firstname is not specified", done => {
            const user = {
                lastname: "julien",
                email: "julien@gmail.com",
                password: "Regedit56",
                type: "admin"
            };
            chai.request(app)
                .post(`${baseUrl}auth/admin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when  lastname is not valid", done => {
            const user = {
                firstname: "hirwa55",
                email: "julien@gmail.com",
                password: "Regedit56",
                type: "admin"
            };
            chai.request(app)
                .post(`${baseUrl}auth/admin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when password is not valid on signup", done => {
            const user = {
                firstname: "hirwa",
                lastname: "julien",
                email: "julien@gmail.com",
                password: "regedi",
            };
            chai.request(app)
                .post(`${baseUrl}auth/signup`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when firstname is not specified on signup", done => {
            const user = {
                lastname: "julien",
                email: "julien@gmail.com",
                password: "Regedit56",
            };
            chai.request(app)
                .post(`${baseUrl}auth/signup`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when email is not valid on signup", done => {
            const user = {
                firstname: "hirwa",
                lastname: "julien",
                email: "julien@gmailcom",
                password: "Regedit56",
            };
            chai.request(app)
                .post(`${baseUrl}auth/signup`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when firstname is not valid on signup", done => {
            const user = {
                firstname: "hirwa87",
                lastname: "julien",
                email: "julien@gmail.com",
                password: "Regedit56",
            };
            chai.request(app)
                .post(`${baseUrl}auth/signup`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when lastname is not valid on signup", done => {
            const user = {
                firstname: "hirwa",
                lastname: "julien56",
                email: "julien@gmail.com",
                password: "Regedit56",
            };
            chai.request(app)
                .post(`${baseUrl}auth/signup`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when password not specifie on signup", done => {
            const user = {
                firstname: "hirwa",
                lastname: "julien56",
                email: "julien@gmail.com"
            };
            chai.request(app)
                .post(`${baseUrl}auth/signup`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when email not specified on signup", done => {
            const user = {
                firstname: "hirwa",
                lastname: "julien56",
                password: "Regedit56",
            };
            chai.request(app)
                .post(`${baseUrl}auth/signup`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when email not specified on signup", done => {
            const user = {
                firstname: "hirwa",
                email: "juliushirwa@gmail.com",
                password: "Regedit56",
            };
            chai.request(app)
                .post(`${baseUrl}auth/signup`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when password is not valid on signin", done => {
            const user = {
                email: "juliushirwa@gmail.com",
                password: "Regedit",
            };
            chai.request(app)
                .post(`${baseUrl}auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when email is not valid on signin", done => {
            const user = {
                email: "juliushirwa@gmailcom",
                password: "Regedit",
            };
            chai.request(app)
                .post(`${baseUrl}auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when email is not specified on signin", done => {
            const user = {
                password: "Regedit",
            };
            chai.request(app)
                .post(`${baseUrl}auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("it should return an error when email is not specified on signin", done => {
            const user = {
                email: "juliushirwa@gmail.com"
            };
            chai.request(app)
                .post(`${baseUrl}auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it("should return admin already exist", done => {
            const user = {
                email: "admin@gmail.com",
                firstname: "hirwa",
                lastname: "julien",
                password: "Regedit56",
                type: "cashier"
            };
            chai.request(app)
                .post(`${baseUrl}auth/admin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should create normal user", done => {
            const user = {
                email: "julien@gmail.com",
                firstname: "hirwa",
                lastname: "julien",
                password: "Regedit56"
            };
            chai.request(app)
            .post(`${baseUrl}auth/signup`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });

        it("should create new admin", done => {
            const user = {
                email: "julien@gmail.com",
                firstname: "hirwa",
                lastname: "julien",
                password: "Regedit56",
                type: "cashier"
            };
            chai.request(app)
            .post(`${baseUrl}auth/admin`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
        });

        it("it should login a user", done => {
            const user = {
                email: "julien@gmail.com",
                password: "Regedit56"
            };
            chai.request(app)
                .post(`${baseUrl}auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe("drop all tables", () => {
        it("it should drop transactions table", () => {
            Db.query("DELETE FROM transactions");
        });

        it("it should drop accounts table", () => {
            Db.query("DELETE FROM accounts");
        });

        it("it should drop accounts table", () => {
            Db.query("DELETE FROM users");
        });
        
    });
});