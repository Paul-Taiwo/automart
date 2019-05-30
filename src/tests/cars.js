import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

describe('Test for car AD endpoint', () => {
  let carAd;
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: '145000',
        state: 'new',
        year: '2018',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        carAd = res.body.data;
        done();
      });
  });

  it('Should create a car AD', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: '145000',
        state: 'new',
        year: '2018',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.createdOn).to.be.a('string');
        expect(res.body.data.manufacturer).to.be.a('string');
        expect(res.body.data.model).to.be.a('string');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.year).to.be.a('number');
        assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
        assert.strictEqual(res.body.status, 201, 'Status is not 201');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.createdOn, 'Date is not a string');
        assert.isString(res.body.data.manufacturer, 'Manufacturer is not a string');
        assert.isString(res.body.data.model, 'Model is not a string');
        assert.isString(res.body.data.status, 'Status is not a string');
        assert.isNumber(res.body.data.price, 'Price is not a number');
        assert.isString(res.body.data.state, 'State is not a string');
        assert.isNumber(res.body.data.year, 'Year is not a number');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error if request is not authorized', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: '14,500',
        state: 'new',
        year: '2018',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
        assert.strictEqual(res.body.status, 401, 'Status is not 401');
        assert.strictEqual(res.body.error,
          'Authentication failed! Please Login again',
          'Expect error to be Authentication failed! Please Login again');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error if token is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRyMWN2ZFhDQ0s1bldaa2oycmQ0NlZlRUpTeEd6SmNOcG9CaWp5RXhYTFRGLm1oeC4uZXdIZSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTEyODA4LCJleHAiOjE1NTg5MjM2MDh9.ZS813EEUegCYU3suHV1NwunqEZ4RvRzaKyoJ96iwl6E',
      })
      .send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: '14,500',
        state: 'new',
        year: '2018',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
        assert.strictEqual(res.body.status, 401, 'Status is not 401');
        assert.strictEqual(res.body.error,
          'Authentication failed! Please Login again',
          'Expect error to be Authentication failed! Please Login again');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if manufacturer field is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        manufacturer: '',
        model: 'Corolla',
        price: '145000',
        state: 'new',
        year: '2018',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Manufacturer cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Manufacturer cannot be empty',
          'Expect error to be Manufacturer cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if manufacturer field contains a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        manufacturer: 'Toyota21',
        model: 'Corolla',
        price: '145000',
        state: 'new',
        year: '2018',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Manufacturer field cannot contain number(s)');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Manufacturer field cannot contain number(s)',
          'Manufacturer field cannot contain number(s)');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if model field is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        manufacturer: 'Toyota',
        model: '',
        price: '145000',
        state: 'new',
        year: '2018',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Model cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Model cannot be empty',
          'Expect error to be Model cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if body type field is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: '145000',
        state: 'new',
        year: '2018',
        bodyType: '',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Body type cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Body type cannot be empty',
          'Expect error to be Body type cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if car state field is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: '145000',
        state: '',
        year: '2018',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Vehicle state cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Vehicle state cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if car state contains a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: '145000',
        state: 'New12',
        year: '2018',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Car state field cannot contain number(s)');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Car state field cannot contain number(s)');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if year field is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: '145000',
        state: 'new',
        year: '',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Enter a valid year');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error, 'Enter a valid year');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if year is more or less than 4 digits', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: '145000',
        state: 'new',
        year: '20100',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Input a valid year');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Input a valid year');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if price is not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        manufacturer: 'Toyota',
        model: 'Corolla',
        price: 'xxxxxx',
        state: 'new',
        year: '2010',
        bodyType: 'Saloon',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Enter a valid price');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error, 'Enter a valid price');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should update car AD price', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/price`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        price: '1580000',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.createdOn).to.be.a('string');
        expect(res.body.data.email).to.be.a('string');
        expect(res.body.data.manufacturer).to.be.a('string');
        expect(res.body.data.model).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.status).to.equal('available');
        expect(res.body.data.year).to.be.a('number');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.strictEqual(res.body.status, 200, 'Status is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.createdOn, 'Date is not a string');
        assert.isString(res.body.data.manufacturer, 'Manufacturer is not a string');
        assert.isString(res.body.data.model, 'Model is not a string');
        assert.strictEqual(res.body.data.status, 'available', 'Status is not available');
        assert.isNumber(res.body.data.price, 'Price is not a number');
        assert.isString(res.body.data.state, 'State is not a string');
        assert.isNumber(res.body.data.year, 'Year is not a number');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if price is not a number', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/price`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        price: 'xxxxxx',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Enter a valid price');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Enter a valid price',
          'Expect error to be Enter a valid price');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error if request is not authorized', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/price`)
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        price: '1580000',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
        assert.strictEqual(res.body.status, 401, 'Status is not 401');
        assert.strictEqual(res.body.error,
          'Authentication failed! Please Login again',
          'Expect error to be Authentication failed! Please Login again');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error if token is not valid', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/price`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer aeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        price: '1580000',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
        assert.strictEqual(res.body.status, 401, 'Status is not 401');
        assert.strictEqual(res.body.error,
          'Authentication failed! Please Login again',
          'Expect error to be Authentication failed! Please Login again');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should update car AD status', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/status`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        status: 'sold',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.createdOn).to.be.a('string');
        expect(res.body.data.manufacturer).to.be.a('string');
        expect(res.body.data.model).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.status).to.equal('sold');
        expect(res.body.data.year).to.be.a('number');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.strictEqual(res.body.status, 200, 'Status is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.createdOn, 'Date is not a string');
        assert.isString(res.body.data.manufacturer, 'Manufacturer is not a string');
        assert.isString(res.body.data.model, 'Model is not a string');
        assert.strictEqual(res.body.data.status, 'sold', 'Status is not sold');
        assert.isNumber(res.body.data.price, 'Price is not a number');
        assert.isString(res.body.data.state, 'State is not a string');
        assert.isNumber(res.body.data.year, 'Year is not a number');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if status is empty', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/status`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        status: '',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Status cannot be empty');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Status cannot be empty',
          'Expect error to be Status cannot be empty');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if status contains a number', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/status`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        status: 'Sold55',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Status cannot contain number(s)');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Status cannot contain number(s)',
          'Expect error to be Status cannot contain number(s)');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error if request is not authorized', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/status`)
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        status: 'sold',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
        assert.strictEqual(res.body.status, 401, 'Status is not 401');
        assert.strictEqual(res.body.error,
          'Authentication failed! Please Login again',
          'Expect error to be Authentication failed! Please Login again');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should get a specific car', (done) => {
    chai
      .request(app)
      .get(`/api/v1/car/${carAd.id}`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('number');
        expect(res.body.email).to.be.a('string');
        expect(res.body.createdOn).to.be.a('string');
        expect(res.body.manufacturer).to.be.a('string');
        expect(res.body.model).to.be.a('string');
        expect(res.body.price).to.be.a('number');
        expect(res.body.status).to.be.a('string');
        expect(res.body.year).to.be.a('number');
        expect(res.body.state).to.be.a('string');
        expect(res.body.bodyType).to.be.a('string');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Data is not an object');
        assert.isNumber(res.body.id, 'ID is not a number');
        assert.isString(res.body.email, 'Email is not a string');
        assert.isString(res.body.createdOn, 'Date is not a string');
        assert.isString(res.body.manufacturer, 'Manufacturer is not a string');
        assert.isString(res.body.model, 'Model is not a string');
        assert.isString(res.body.status, 'Status is not a string');
        assert.isNumber(res.body.price, 'Price is not a number');
        assert.isString(res.body.state, 'State is not a string');
        assert.isString(res.body.bodyType, 'Body type is not a string');
        assert.isNumber(res.body.year, 'Year is not a number');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return all unsold cars between a price range', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&min_price=100000&max_price=150000')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isArray(res.body.data, 'Data is not array');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return all cars sold or available', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isArray(res.body.data, 'Data is not array');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return all unsold cars with status availbale', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=available')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isArray(res.body.data, 'Data is not array');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return a message if no AD with queried status is found', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=unknown')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('No record found');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'No record found',
          'Data is not equal to No record found');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return a message if no AD with queried status and price is found', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=unknown&min_price=unknown&max_price=unknown')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('No record found');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'No record found',
          'Data is not equal to No record found');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return all unsold cars of a specific manufacturer', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&manufacturer=Toyota')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isArray(res.body.data, 'Data is not array');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return a message if no AD with queried status and manufacturer is found', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=unknown&manufacturer=unknown')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('No record found');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'No record found',
          'Data is not equal to No record found');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return all unsold cars of a specific state', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&state=new')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isArray(res.body.data, 'Data is not array');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return a message if no AD with queried status and state is found', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=unknown&state=unknown')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('No record found');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'No record found',
          'Data is not equal to No record found');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return all unsold cars of a specific body type', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&bodyType=Saloon')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isArray(res.body.data, 'Data is not array');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return a message if no AD with queried status and body type is found', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=unknown&bodyType=unknown')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('No record found');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'No record found',
          'Data is not equal to No record found');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should delete an AD if user is an admin', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/car/${carAd.id}`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRaNk82MVkvS2VkZlRKQ2JJNFNDTEFlbzB5LzdmTFBqZlJDMFA4L0NYY2hnVldONkJYbi5CSyIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE1NTkxMzk4NDAsImV4cCI6MTU1OTMxMjY0MH0.O2QKtfG9xqM37sCWlic2ySJeWEA9e6KTbd5zagRraKY',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('Car Ad successfully deleted');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'Car Ad successfully deleted',
          'Data is not equal to Car Ad successfully deleted');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return a message if record is not found', (done) => {
    chai
      .request(app)
      .delete('/api/v1/car/11111045')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRaNk82MVkvS2VkZlRKQ2JJNFNDTEFlbzB5LzdmTFBqZlJDMFA4L0NYY2hnVldONkJYbi5CSyIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE1NTkxMzk4NDAsImV4cCI6MTU1OTMxMjY0MH0.O2QKtfG9xqM37sCWlic2ySJeWEA9e6KTbd5zagRraKY',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.equal('No record found');
        expect(res.body.data).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isString(res.body.data, 'Data is not a string');
        assert.strictEqual(res.body.data,
          'No record found',
          'Data is not equal to No record found');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error if user is not an admin', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/car/${carAd.id}`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.equal('Forbidden: Only Admin can delete an AD');
        expect(res.body.error).to.be.a('string');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 403, 'Status code is not 403');
        assert.isString(res.body.error, 'Data is not a string');
        assert.strictEqual(res.body.error,
          'Forbidden: Only Admin can delete an AD',
          'Error is not equal to Forbidden: Only Admin can delete an AD');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
});
