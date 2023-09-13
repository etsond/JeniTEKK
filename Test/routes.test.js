const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('Main Routes', () => {
  it('should return status 200 for GET /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

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

  it('should return status 200 for GET /userProfile/:id', (done) => {
    // Replace ':id' with an actual user ID from your application
    chai.request(app)
      .get('/userProfile/:id')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return status 200 for GET /login', (done) => {
    chai.request(app)
      .get('/login')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return status 200 for POST /login', (done) => {
    // Add a valid login request body here
    chai.request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return status 200 for GET /logout', (done) => {
    chai.request(app)
      .get('/logout')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return status 200 for GET /register', (done) => {
    chai.request(app)
      .get('/register')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return status 200 for POST /register', (done) => {
    // Add a valid registration request body here
    chai.request(app)
      .post('/register')
      .send({ username: 'newuser', password: 'newpassword' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
