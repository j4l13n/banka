import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';
import Db from './../db/index';

chai.use(chaiHttp);
chai.should();
const { expect } = chai; 

const baseUrl = `/api/v2/`;
let token = ``;
let adminToken = ``;

describe("Test all accounts routes", () => {

    describe("POST /accounts", () => {
        it("should create new admin", done => {
            const user = {
                email: "hirwa@gmail.com",
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
                adminToken = res.body.data.token;
                done();
            });
        });

        it("it should login a user", done => {
            const user = {
                email: "hirwa@gmail.com",
                password: "Regedit56"
            };
            chai.request(app)
                .post(`${baseUrl}auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    token = res.body.data.token;
                    done();
                });
        });

        it("it should create a user account", done => {
            const account = {
                type: "current"
            };
            chai.request(app)
                .post(`${baseUrl}accounts`)
                .set("Authorization", "Bearer " + token)
                .send(account)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("it should return an error when password is not correct", done => {
            const user = {
                email: "hirwa@gmail.com",
                password: "Regedit5"
            };
            chai.request(app)
                .post(`${baseUrl}auth/signin`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
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