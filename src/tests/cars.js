import { describe, it, before } from 'mocha';
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { readFileSync } from 'fs';
import 'core-js/stable';
import 'regenerator-runtime';
import app from '../app';


chai.use(chaiHttp);

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMTMyNjc1NDYwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJUYWl3byIsImVtYWlsIjoiYXlvcGF1bG90QGdtYWlsLmNvbSIsImFkZHJlc3MiOiIxMiwgQWRlcmliaWdiZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDk0NjU0NiwiZXhwIjoxNTYxMTkxMzQ2fQ.BmqvWXxsR67XG6hePl7bsnj_bXM62sKWNbMnqBYbzQo';
const invalidToken = 'Bearer engaF1bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMTMyNjc1NDYwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJUYWl3byIsImVtYWlsIjoiYXlvcGF1bG90QGdtYWlsLmNvbSIsImFkZHJlc3MiOiIxMiwgQWRlcmliaWdiZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDk0NjU0NiwiZXhwIjoxNTYxMTkxMzQ2fQ.BmqvWXxsR67XG6hePl7bsnj_bXM62sKWNbMnqBYbzQo';
const file = readFileSync('src/test-img/car.png');
const file2 = readFileSync('src/test-img/car2.jpg');

describe('Test for car AD endpoint', () => {
  let carAd;
  before(async () => {
    const prom = new Promise((resolve) => {
      const res = chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-type': 'multipart/form-data',
          Authorization: token,
        })
        .field('manufacturer', 'Toyota')
        .field('model', 'Corolla')
        .field('price', '145000')
        .field('state', 'new')
        .field('year', '2018')
        .field('bodyType', 'Saloon')
        .attach('image', file, 'Car1.jpg')
        .attach('image', file2, 'Car2.jpg');
      resolve(res);
    }).then(res => res)
      .catch((err) => {
        throw err;
      });
    const response = await prom;
    carAd = response.body.data;
  });

  it('Should not create if image is less than 2', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-type': 'multipart/form-data',
        Authorization: token,
      })
      .field('manufacturer', 'Toyota')
      .field('model', 'Corolla')
      .field('price', '145000')
      .field('state', 'new')
      .field('year', '2018')
      .field('bodyType', 'Saloon')
      .attach('image', file, 'Car1.jpg')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Upload at least two(2) images of the car');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Upload at least two(2) images of the car');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should create an AD', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
      })
      .field('manufacturer', 'Toyota')
      .field('model', 'Corolla')
      .field('price', '145000')
      .field('state', 'new')
      .field('year', '2018')
      .field('bodyType', 'Saloon')
      .attach('image', file, 'Car1.jpg')
      .attach('image', file2, 'Car2.jpg')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(201);
        expect(res.statusCode).to.equal(201);
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
        assert.strictEqual(res.body.status, 201, 'Status is not 201');
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
        Authorization: invalidToken,
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
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: token,
      })
      .field('manufacturer', '')
      .field('model', 'Corolla')
      .field('price', '145000')
      .field('state', 'new')
      .field('year', '2018')
      .field('bodyType', 'Saloon')
      .attach('image', file, 'Car1.jpg')
      .attach('image', file2, 'Car2.jpg')

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
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: token,
      })
      .field('manufacturer', '12344')
      .field('model', 'Corolla')
      .field('price', '145000')
      .field('state', 'new')
      .field('year', '2018')
      .field('bodyType', 'Saloon')
      .attach('image', file, 'Car1.jpg')
      .attach('image', file2, 'Car2.jpg')
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
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: token,
      })
      .field('manufacturer', 'Toyota')
      .field('model', '')
      .field('price', '145000')
      .field('state', 'new')
      .field('year', '2018')
      .field('bodyType', 'Saloon')
      .attach('image', file, 'Car1.jpg')
      .attach('image', file2, 'Car2.jpg')
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
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: token,
      })
      .field('manufacturer', 'Toyota')
      .field('model', 'Corolla')
      .field('price', '145000')
      .field('state', 'new')
      .field('year', '2018')
      .field('bodyType', '')
      .attach('image', file, 'Car1.jpg')
      .attach('image', file2, 'Car2.jpg')
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
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: token,
      })
      .field('manufacturer', 'Toyota')
      .field('model', 'Corolla')
      .field('price', '145000')
      .field('state', '')
      .field('year', '2018')
      .field('bodyType', 'Saloon')
      .attach('image', file, 'Car1.jpg')
      .attach('image', file2, 'Car2.jpg')
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
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: token,
      })
      .field('manufacturer', 'Toyota')
      .field('model', 'Corolla')
      .field('price', '145000')
      .field('state', 'New12')
      .field('year', '2018')
      .field('bodyType', 'Saloon')
      .attach('image', file, 'Car1.jpg')
      .attach('image', file2, 'Car2.jpg')
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
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: token,
      })
      .field('manufacturer', 'Toyota')
      .field('model', 'Corolla')
      .field('price', '145000')
      .field('state', 'new')
      .field('year', '')
      .field('bodyType', 'Saloon')
      .attach('image', file, 'Car1.jpg')
      .attach('image', file2, 'Car2.jpg')
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
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: token,
      })
      .field('manufacturer', 'Toyota')
      .field('model', 'Corolla')
      .field('price', '145000')
      .field('state', 'new')
      .field('year', '20186')
      .field('bodyType', 'Saloon')
      .attach('image', file, 'Car1.jpg')
      .attach('image', file2, 'Car2.jpg')
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
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: token,
      })
      .field('manufacturer', 'Toyota')
      .field('model', 'Corolla')
      .field('price', 'xxxxxx')
      .field('state', 'new')
      .field('year', '2018')
      .field('bodyType', 'Saloon')
      .attach('image', file, 'Car1.jpg')
      .attach('image', file2, 'Car2.jpg')
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

  it('Should return an error message if status is empty', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/status`)
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: '',
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
});
