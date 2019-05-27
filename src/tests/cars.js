import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

describe('Test for create car AD endpoint', () => {
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
        expect(res.body.data.price).to.be.a('number');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.year).to.be.a('number');
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
        done();
      });
  });
});

describe('Test for update car AD status', () => {
  // Create an AD before running test
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
        done();
      });
  });

  it('Should return an error if token is not valid', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/status`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRyMWN2ZFhDQ0s1bldaa2oycmQ0NlZlRUpTeEd6SmNOcG9CaWp5RXhYTFRGLm1oeC4uZXdIZSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTEyODA4LCJleHAiOjE1NTg5MjM2MDh9.ZS813EEUegCYU3suHV1NwunqEZ4RvRzaKyoJ96iwl6E',
      })
      .send({
        status: 'sold',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        done();
      });
  });
});

describe('Test for update car AD price', () => {
  // Create an AD before running test
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
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.createdOn).to.be.a('string');
        expect(res.body.data.email).to.be.a('string');
        expect(res.body.data.manufacturer).to.be.a('string');
        expect(res.body.data.model).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.status).to.equal('sold');
        expect(res.body.data.year).to.be.a('number');
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
        done();
      });
  });

  it('Should return an error if token is not valid', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/price`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRyMWN2ZFhDQ0s1bldaa2oycmQ0NlZlRUpTeEd6SmNOcG9CaWp5RXhYTFRGLm1oeC4uZXdIZSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTEyODA4LCJleHAiOjE1NTg5MjM2MDh9.ZS813EEUegCYU3suHV1NwunqEZ4RvRzaKyoJ96iwl6E',
      })
      .send({
        price: '1580000',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        done();
      });
  });
});
