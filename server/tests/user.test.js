import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import userdb from './../mockdb/user';
// Configure chai
chai.use(chaiHttp);
chai.should();
const {expect}=chai;
describe("Users", () => {
	// Test get http requests
	describe("GET /", () => {
		// Test to get all users records
		it("should get all users records", (done) => {
			chai.request(app)
				.get('/api/v1/users')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});

		// Test to get single user record
		it("should get a single user record", (done) => {
			const id = 1;
			chai.request(app)
				.get(`/api/v1/users/${id}`)
				.end((err, res) => {
					const singleUser = userdb.find( user => user.id === id);
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
	describe('/PUT/:id user', () => {
		it('it should update a user given id', done => {
			let id = 1;
			chai.request(app)
				.put(`/api/v1/users/${id}`)
				.send({ firstname: "hirwa", lastname: "djally", email: "juliushirwa@gmail.com", password: "reg!@#4453", type: "client", isAdmin: false })
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
				done();
			});
		});
	});
	

	// testing post http request
	describe('/POST user', () => {
		it("it should post a user", (done) => {
			let user = {
				id: 2,
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

		it("return an error if password is not provided", (done) => {
			let user = {
				id: 2,
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
	});

	describe('/DELETE:id user', () => {
		it("it should delete a user", (done) => {
			let id = 1;
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
		})
	});
});