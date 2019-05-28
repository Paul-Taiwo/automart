import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

describe('Test Sign up endpoint', () => {
  it('should create an admin', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/admin/signup')
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
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.id).to.be.an('number');
        expect(res.body.data.firstname).to.be.a('string');
        expect(res.body.data.lastname).to.be.a('string');
        expect(res.body.data.isAdmin).to.be.a('boolean');
        expect(res.body.data.isAdmin).to.equal(true);
        assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
        assert.strictEqual(res.body.status, 201, 'Status is not 201');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isString(res.body.data.token, 'Token is not a string');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.firstname, 'Firstname is not a string');
        assert.isString(res.body.data.lastname, 'Last name is not a string');
        assert.isBoolean(res.body.data.isAdmin, 'isAdmin type is not boolean');
        assert.strictEqual(res.body.data.isAdmin, true, 'isAdmin is not true');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
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
        expect(res.body.data.token).to.be.a('string');
        expect(res.body.data.id).to.be.an('number');
        expect(res.body.data.firstname).to.be.a('string');
        expect(res.body.data.lastname).to.be.a('string');
        assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
        assert.strictEqual(res.body.status, 201, 'Status is not 201');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isString(res.body.data.token, 'Token is not a string');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.firstname, 'Firstname is not a string');
        assert.isString(res.body.data.lastname, 'Last name is not a string');
        assert.isNull(err, 'Expect error to not exist');
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
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Name fields cannot be empty',
          'Expect error to be Name fields cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
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
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Name fields cannot be less than 2 characters',
          'Expect error to be Name fields cannot be less than 2 characters');
        assert.isNull(err, 'Expect error to not exist');
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
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Name fields cannot be empty',
          'Expect error to be Name fields cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
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
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Name fields cannot be less than 2 characters',
          'Expect error to be Name fields cannot be less than 2 characters');
        assert.isNull(err, 'Expect error to not exist');
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
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Password field cannot be empty',
          'Expect error to be Password field cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
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
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Password cannot be less than 8 characters',
          'Expect error to be Password field cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
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
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Please provide a valid email address',
          'Expect error to be Please provide a valid email address');
        assert.isNull(err, 'Expect error to not exist');
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
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.strictEqual(res.body.status, 200, 'Status is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isString(res.body.data.token, 'Token is not a string');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.firstname, 'Firstname is not a string');
        assert.isString(res.body.data.lastname, 'Last name is not a string');
        assert.isNull(err, 'Expect error to not exist');
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
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Email not found',
          'Expect error to be Email not found');
        assert.isNull(err, 'Expect error to not exist');
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
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Password is incorrect',
          'Expect error to be Password is incorrect');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
});
