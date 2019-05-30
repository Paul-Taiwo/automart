import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import chai, { expect, assert } from 'chai';
import app from '../app';

chai.use(chaiHttp);

describe('Test create flag endpoint', () => {
  it('Should create a flag', (done) => {
    chai
      .request(app)
      .post('/api/v1/flag/report')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        carId: 10000043,
        reason: 'Image not availble',
        description: 'Image is not available for the AD',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.car_id).to.be.a('number');
        expect(res.body.data.reason).to.be.a('string');
        expect(res.body.data.description).to.be.a('string');
        assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
        assert.strictEqual(res.body.status, 201, 'Status is not 201');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isNumber(res.body.data.car_id, 'Car ID is not a number');
        assert.isString(res.body.data.reason, 'Reason is not a string');
        assert.isString(res.body.data.description, 'Description is not a string');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error car Id is not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/flag/report')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        carId: 'bbb10000043',
        reason: 'Image not availble',
        description: 'Image is not available for the AD',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('Enter a valid ID');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Enter a valid ID',
          'Expect error to be Enter a valid ID');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
});
