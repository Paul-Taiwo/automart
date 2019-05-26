import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

describe('Test Sign up endpoint', () => {
  it('should create a user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Testernio',
        lastname: 'Obodokuna',
        password: 'testTest12345',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('Should return an error message if firstname is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: '',
        lastname: 'Obodokuna',
        password: 'testTest12345',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Name fields cannot be empty');
        done();
      });
  });

  it('Should return an error message if firstname is less than 2 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Te',
        lastname: 'Obodokuna',
        password: 'testTest12345',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Name fields cannot be less than 2 characters');
        done();
      });
  });

  it('Should return an error message if lastname is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Tester',
        lastname: '',
        password: 'testTest12345',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Name fields cannot be empty');
        done();
      });
  });

  it('Should return an error message if lastname is less than 2 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Testernio',
        lastname: 'Ob',
        password: 'testTest12345',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Name fields cannot be less than 2 characters');
        done();
      });
  });


  it('Should return an error message if password is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Tester',
        lastname: 'Obodokuna',
        password: '',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Password field cannot be empty');
        done();
      });
  });

  it('Should return an error message if password is less than 8 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Tester',
        lastname: 'Obodokuna',
        password: 'test12',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equals(400);
        expect(res.body.error).to.equals('Password cannot be less than 8 characters');
        done();
      });
  });

  it('Should return an error message if email is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Tester',
        lastname: 'Obodokuna',
        password: 'testTest12345',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagbagmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Please provide a valid email address');
        done();
      });
  });
});

describe('Test sign in endpoint', () => {
  it('should log the user in', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        email: 'alagba@gmail.com',
        password: 'testTest12345',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.id).to.be.an('number');
        expect(res.body.data.firstname).to.be.a('string');
        expect(res.body.data.lastname).to.be.a('string');
        done();
      });
  });

  it('should return an error if email is not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        email: 'alagb@gmail.com',
        password: 'testTest12345',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Email not found');
        done();
      });
  });

  it('should return an error if password is wrong', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        email: 'alagba@gmail.com',
        password: 'testTest1235',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Password is incorrect');
        done();
      });
  });
});
