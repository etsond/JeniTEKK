// importing testing libraries and app
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 
const expect = chai.expect;

// adding chai HTTP plugin for making http requests
chai.use(chaiHttp);

// describing block for testing main routes
describe('Main Routes', () => {
    // test case : Should return status 200 For GET /
  it('should return status 200 for GET /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

//   Test case : Should return status 200 For GET /profile
  it('should return status 200 for GET /profile', (done) => {
    chai.request(app)
      .get('/profile')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return status 200 for GET /playfeed', (done) => {
    chai.request(app)
      .get('/playfeed')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

//   test case : Should return status 200 For GET /userProfile/:id
  it('should return status 200 for GET /userProfile/:id', (done) => {
    chai.request(app)
    //  Add a valid user id
      .get('/userProfile/:id')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

//   test case : Should return status 200 For GET /login
  it('should return status 200 for GET /login', (done) => {
    chai.request(app)
      .get('/login')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
// test case : Should return status 200 For POST /login
  it('should return status 200 for POST /login', (done) => {
    // TODO: Add a valid login request here
    chai.request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
//   test case : Should return status 200 For GET /logout

  it('should return status 200 for GET /logout', (done) => {
    chai.request(app)
      .get('/logout')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

//   test case : Should return status 200 For GET /register
  it('should return status 200 for GET /register', (done) => {
    chai.request(app)
      .get('/register')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

//   test case : Should return status 200 For POST /register
  it('should return status 200 for POST /register', (done) => {
    // Add a valid registration request body 
    chai.request(app)
      .post('/register')
      .send({ username: 'newuser', password: 'newpassword' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
