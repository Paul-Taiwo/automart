import { describe, it, before } from 'mocha';
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { readFileSync } from 'fs';
import 'core-js/stable';
import 'regenerator-runtime';
import app from '../app';


chai.use(chaiHttp);

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMTMyNjc1NDYwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJUYWl3byIsImVtYWlsIjoiYXlvcGF1bG90QGdtYWlsLmNvbSIsImFkZHJlc3MiOiIxMiwgQWRlcmliaWdiZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDk0NjU0NiwiZXhwIjoxNTYxMTkxMzQ2fQ.BmqvWXxsR67XG6hePl7bsnj_bXM62sKWNbMnqBYbzQo';
const adminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMTMyNjc1NDYwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJUYWl3byIsImVtYWlsIjoiYXlvcGF1bG90YUBnbWFpbC5jb20iLCJhZGRyZXNzIjoiMTIsIEFkZXJpYmlnYmUiLCJpc19hZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTA0MDI4NywiZXhwIjoxNTYxMjg1MDg3fQ.f4pnNPQdWOUNQsH9AZXa6WOBQw46-TJU2dJPJ0d95TY';
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

  it('Should return an error message if car status is not sold', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/status`)
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
      })
      .send({
        status: 'solded',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Status can only be updated to sold');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Status can only be updated to sold');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should update car AD price', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/price`)
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
      })
      .send({
        price: '41580000',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.updated_on).to.be.a('string');
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
        assert.isString(res.body.data.updated_on, 'Date is not a string');
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

  it('Should return an error message if price is not valid', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/price`)
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
      })
      .send({
        price: '312000f0',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equals('Please enter a valid price');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
        assert.strictEqual(res.body.status, 400, 'Status is not 400');
        assert.strictEqual(res.body.error,
          'Please enter a valid price',
          'Expect error to be Please enter a valid price');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error message if price is not a number', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/car/${carAd.id}/price`)
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: '',
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
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: invalidToken,
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

  it('Should get a specific car', (done) => {
    chai
      .request(app)
      .get(`/api/v1/car/${carAd.id}`)
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.email).to.be.a('string');
        expect(res.body.data.created_on).to.be.a('string');
        expect(res.body.data.manufacturer).to.be.a('string');
        expect(res.body.data.model).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.year).to.be.a('number');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.body_type).to.be.a('string');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.isObject(res.body, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isString(res.body.data.email, 'Email is not a string');
        assert.isString(res.body.data.created_on, 'Date is not a string');
        assert.isString(res.body.data.manufacturer, 'Manufacturer is not a string');
        assert.isString(res.body.data.model, 'Model is not a string');
        assert.isString(res.body.data.status, 'Status is not a string');
        assert.isNumber(res.body.data.price, 'Price is not a number');
        assert.isString(res.body.data.state, 'State is not a string');
        assert.isString(res.body.data.body_type, 'Body type is not a string');
        assert.isNumber(res.body.data.year, 'Year is not a number');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return a message if ID is wrong', (done) => {
    chai
      .request(app)
      .get('/api/v1/car/1111111111')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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

  it('Should return all unsold cars with status availbale', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .query({
        status: 'available',
      })
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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

  it('Should return all unsold cars between a price range', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .query({
        status: 'available',
        max_price: '50000000',
        min_price: '160000',
      })
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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

  it('Should return a message if no AD with queried price is found', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .query({
        status: 'available',
        min_price: '200000',
        max_price: '10000',
      })
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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

  it('Should return a message if query is bad', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .query({
        status: 'availablde',
        min_price: '200000',
        max_price: '10000',
      })
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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
      .get('/api/v1/car')
      .query({
        status: 'available',
        manufacturer: 'Toyota',
      })
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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

  it('Should return a message if query is bad', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .query({
        status: 'availablee',
        manufacturer: 'Toyota',
      })
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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

  it('Should return a message if record is not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/car/')
      .query({
        status: 'available',
        manufacturer: 'Toyorta',
      })
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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
      .get('/api/v1/car')
      .query({
        status: 'available',
        bodyType: 'Saloon',
      })
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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

  it('Should return a message if query is bad', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .query({
        status: 'availablee',
        bodyType: 'Saloon',
      })
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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

  it('Should return a message if record is not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/car/')
      .query({
        status: 'available',
        bodyType: 'Saloonara',
      })
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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

  it('Should return all cars if user is an Admin', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: adminToken,
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

  it('Should return no record found if user is ', (done) => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: adminToken,
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

  it('Should delete an AD if user is an admin', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/car/${carAd.id}`)
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: adminToken,
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
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: adminToken,
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

  it('Should return an error if  ID is bad', (done) => {
    chai
      .request(app)
      .delete('/api/v1/car/123456g')
      .set({
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: adminToken,
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
        'Content-type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: token,
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
