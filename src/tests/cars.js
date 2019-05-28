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
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQyZFFldFgwcGlzV3o4NXN3Zk1QY0UuLzQzQVpYTEF6OTJHM01sb2w5QWZnUDA1RnZZeGNmYSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTMzNjc5LCJleHAiOjE1NTkxMDY0Nzl9.hDYLLjNdBiss5ljRB_rjn5Iz2-AY5aihFDCbYSsUxwE',
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
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQyZFFldFgwcGlzV3o4NXN3Zk1QY0UuLzQzQVpYTEF6OTJHM01sb2w5QWZnUDA1RnZZeGNmYSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTMzNjc5LCJleHAiOjE1NTkxMDY0Nzl9.hDYLLjNdBiss5ljRB_rjn5Iz2-AY5aihFDCbYSsUxwE',
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

  it('Should update car AD price', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/price`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQyZFFldFgwcGlzV3o4NXN3Zk1QY0UuLzQzQVpYTEF6OTJHM01sb2w5QWZnUDA1RnZZeGNmYSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTMzNjc5LCJleHAiOjE1NTkxMDY0Nzl9.hDYLLjNdBiss5ljRB_rjn5Iz2-AY5aihFDCbYSsUxwE',
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
        Authorization: 'Bearer aeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQyZFFldFgwcGlzV3o4NXN3Zk1QY0UuLzQzQVpYTEF6OTJHM01sb2w5QWZnUDA1RnZZeGNmYSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTMzNjc5LCJleHAiOjE1NTkxMDY0Nzl9.hDYLLjNdBiss5ljRB_rjn5Iz2-AY5aihFDCbYSsUxwE',
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
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQyZFFldFgwcGlzV3o4NXN3Zk1QY0UuLzQzQVpYTEF6OTJHM01sb2w5QWZnUDA1RnZZeGNmYSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTMzNjc5LCJleHAiOjE1NTkxMDY0Nzl9.hDYLLjNdBiss5ljRB_rjn5Iz2-AY5aihFDCbYSsUxwE',
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

  it('Should return an error if token is not valid', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/status`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer CI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRyMWN2ZFhDQ0s1bldaa2oycmQ0NlZlRUpTeEd6SmNOcG9CaWp5RXhYTFRGLm1oeC4uZXdIZSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTEyODA4LCJleHAiOjE1NTg5MjM2MDh9.ZS813EEUegCYU3suHV1NwunqEZ4RvRzaKyoJ96iwl6E',
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
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQyZFFldFgwcGlzV3o4NXN3Zk1QY0UuLzQzQVpYTEF6OTJHM01sb2w5QWZnUDA1RnZZeGNmYSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTMzNjc5LCJleHAiOjE1NTkxMDY0Nzl9.hDYLLjNdBiss5ljRB_rjn5Iz2-AY5aihFDCbYSsUxwE',
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

  it('Should return all cars', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQyZFFldFgwcGlzV3o4NXN3Zk1QY0UuLzQzQVpYTEF6OTJHM01sb2w5QWZnUDA1RnZZeGNmYSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTMzNjc5LCJleHAiOjE1NTkxMDY0Nzl9.hDYLLjNdBiss5ljRB_rjn5Iz2-AY5aihFDCbYSsUxwE',
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

  it('Should return all cars with status availbale', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=available')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQyZFFldFgwcGlzV3o4NXN3Zk1QY0UuLzQzQVpYTEF6OTJHM01sb2w5QWZnUDA1RnZZeGNmYSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTMzNjc5LCJleHAiOjE1NTkxMDY0Nzl9.hDYLLjNdBiss5ljRB_rjn5Iz2-AY5aihFDCbYSsUxwE',
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

  it('Should return all cars between a price range', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&min_price=10000&max_price=2000000')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQyZFFldFgwcGlzV3o4NXN3Zk1QY0UuLzQzQVpYTEF6OTJHM01sb2w5QWZnUDA1RnZZeGNmYSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTMzNjc5LCJleHAiOjE1NTkxMDY0Nzl9.hDYLLjNdBiss5ljRB_rjn5Iz2-AY5aihFDCbYSsUxwE',
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

  it('Should return all cars of a specific manufacturer', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&manufacturer=Benz')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQyZFFldFgwcGlzV3o4NXN3Zk1QY0UuLzQzQVpYTEF6OTJHM01sb2w5QWZnUDA1RnZZeGNmYSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTMzNjc5LCJleHAiOjE1NTkxMDY0Nzl9.hDYLLjNdBiss5ljRB_rjn5Iz2-AY5aihFDCbYSsUxwE',
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

  it('Should return all cars of a specific state', (done) => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&state=new')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQyZFFldFgwcGlzV3o4NXN3Zk1QY0UuLzQzQVpYTEF6OTJHM01sb2w5QWZnUDA1RnZZeGNmYSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTMzNjc5LCJleHAiOjE1NTkxMDY0Nzl9.hDYLLjNdBiss5ljRB_rjn5Iz2-AY5aihFDCbYSsUxwE',
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
});
