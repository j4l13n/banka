import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import userdb from './../mockdb/user';
import { resolveMx } from 'dns';
// Configure chai
chai.use(chaiHttp);
chai.should();
const { expect } = chai;
let token = '';
describe("Users", () => {
	// it should return an error when no token set
	describe('GET /', () => {
		it("it should return an error when no token set", done => {
			chai.request(app)
				.get(`/api/v1/users`)
				.end((err, res) => {
					res.should.have.status(401);
					res.body.should.be.an('object');
					res.body.should.have.property('error');
					done();
				});
		});
	});
	// Post requests
	describe('/POST user', () => {
		it("it should return response when user sign in", done => {
			const usr = {
				email: "juliushirwa@gmail.com",
				password: "regedit56"
			};
			chai.request(app)
				.post(`/api/v1/auth/signin`)
				.send(usr)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('data');
					token = res.body.data.token;
					res.type.should.equal('application/json');
				done();
			});
		});
		it("it should sign up a user", (done) => {
			let user = {
				firstname: "Kagabo",
				lastname: "Faustin",
				email: "faustinkagabo@gmail.com",
				password: "reg183@hel89",
				type: "client",
				isAdmin: false
			};

			chai.request(app)
				.post(`/api/v1/auth/signup`)
				.send(user)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('user added successfully');
					token = res.body.data.token;
					res.type.should.equal('application/json');
					done();
				});
		});

		it("return an error if firstname is not provided", (done) => {
			let user = {
				id: 2,
				lastname: "Faustin",
				email: "faustinkagabo@gmail.com",
				password: "reg183@hel89",
				type: "client",
				isAdmin: false
			};

			chai.request(app)
				.post(`/api/v1/auth/signup`)
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('firstname is required');
					done();
				});
		});

		it("return an error if lastname is not provided", (done) => {
			let user = {
				id: 2,
				firstname: "Faustin",
				email: "faustinkagabo@gmail.com",
				password: "reg183@hel89",
				type: "client",
				isAdmin: false
			};

			chai.request(app)
				.post(`/api/v1/auth/signup`)
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('lastname is required');
					done();
				});
		});

		it("return an error if email is not provided", (done) => {
			let user = {
				id: 2,
				firstname: "Kagabo",
				lastname: "Faustin",
				password: "reg183@hel89",
				type: "client",
				isAdmin: false
			};

			chai.request(app)
				.post(`/api/v1/auth/signup`)
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('email is required');
					done();
				});
		});

		it("return an error if password is not provided", (done) => {
			let user = {
				firstname: "Kagabo",
				lastname: "Faustin",
				email: "faustinkagabo@gmail.com",
				type: "client",
				isAdmin: false
			};

			chai.request(app)
				.post(`/api/v1/auth/signup`)
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('password is required');
					done();
				});
		});

		it("it should return an error when user not signed in", done => {
			const usr = {
				email: "juliushi@gmail.com",
				password: ""
			};
			chai.request(app)
				.post(`/api/v1/auth/signin`)
				.send(usr)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.an('object');
					res.body.should.have.property('error');
				done();
			});
		});
	});

	// Test get http requests
	describe("GET /", () => {
		// Test to get all users records
		it("should get all users records", (done) => {
			chai.request(app)
				.get('/api/v1/users')
				.set('Authorization', 'Bearer ' + token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});

		// Test to get single user record
		it("should get a single user record", (done) => {
			const id = 109605343276;
			chai.request(app)
				.get(`/api/v1/users/${id}`)
				.end((err, res) => {
					const singleUser = userdb.find(user => user.id === id);
					expect(singleUser).to.be.an('object');
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});

		// Test to get not found if user does not exist
		it("should get a not found message when user not exist", (done) => {
			const id = 4;
			chai.request(app)
				.get(`/api/v1/users/${id}`)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('User not found');
					done();
				});
		});
	});

	// tests put http request
	// describe('/PUT/:id user', () => {
	// 	it('it should update a user given id', done => {
	// 		let id = 1204925696239;
	// 		chai.request(app)
	// 			.put(`/api/v1/users/${id}`)
	// 			.send({ firstname: "ishimwe", lastname: "divin", email: "claudel@gmail.com", password: "regedit56", type: "client", isAdmin: false })
	// 			.end((err, res) => {
	// 				res.should.have.status(201);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('message');
	// 				done();
	// 		});
	// 	});
	// 	it('it should return an error if id not found', done => {
	// 		let id = 5;
	// 		chai.request(app)
	// 			.put(`/api/v1/users/${id}`)
	// 			.send({ firstname: "hirwa", lastname: "djally", email: "juliushirwa@gmail.com", password: "reg!@#4453", type: "client", isAdmin: false })
	// 			.end((err, res) => {
	// 				res.should.have.status(404);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('message');
	// 				done();
	// 		});
	// 	});

	// 	it("it should return an error if password not found", done => {
    //         let id = 1;
	// 		chai.request(app)
	// 			.put(`/api/v1/users/${id}`)
	// 			.send({ firstname: "hirwa", lastname: "djally", email: "juliushirwa@gmail.com", type: "client", isAdmin: false })
	// 			.end((err, res) => {
	// 				res.should.have.status(400);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('message');
	// 				done();
	// 		});
	// 	});
		
	// 	it('it should return an error if email not found', done => {
	// 		let id = 1;
	// 		chai.request(app)
	// 			.put(`/api/v1/users/${id}`)
	// 			.send({ firstname: "hirwa", lastname: "djally", password: "reg!@#4453", type: "client", isAdmin: false })
	// 			.end((err, res) => {
	// 				res.should.have.status(400);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('message');
	// 				done();
	// 		});
	// 	});

	// 	it('it should return an error if lastname not found', done => {
	// 		let id = 1;
	// 		chai.request(app)
	// 			.put(`/api/v1/users/${id}`)
	// 			.send({ firstname: "hirwa", email: "juliushirwa@gmail.com", password: "reg!@#4453", type: "client", isAdmin: false })
	// 			.end((err, res) => {
	// 				res.should.have.status(400);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('message');
	// 				done();
	// 		});
	// 	});

	// 	it('it should return an error if firstname not found', done => {
	// 		let id = 1;
	// 		chai.request(app)
	// 			.put(`/api/v1/users/${id}`)
	// 			.send({ lastname: "Julien", email: "juliushirwa@gmail.com", password: "reg!@#4453", type: "client", isAdmin: false })
	// 			.end((err, res) => {
	// 				res.should.have.status(400);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('message');
	// 				done();
	// 		});
	// 	});
	// });


	// testing post http request
	

	describe('/DELETE:id user', () => {
		it("it should delete a user", (done) => {
			let id = 1204925696239;
			chai.request(app)
				.delete(`/api/v1/users/${id}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('User deleted successfully');
					done();
				});
		});

		it("it should return an error if user not found", (done) => {
			let id = 5;
			chai.request(app)
				.delete(`/api/v1/users/${id}`)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('user not found');
					done();
				});
		});
	});
});
