import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Users", () => {
	describe("GET /", () => {
		// Test to get all users records
		it("should get all users records", (done) => {
			chai.request(app)
				.get('/api/v1/users')
				.end((err, res) => {
					res.should.status(200);
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
					res.should.have.status(200);
					res.body.should.be.a('object');
					done();
				});
		});

		// Test should not get a single user record
	});
});