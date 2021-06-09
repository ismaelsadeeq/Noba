const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('GET /api/v1/users', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, 'Users Endpoint', done);
  });
});
describe('POST /api/v1/auth/sign-up', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/auth/sign-up')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, 'Sign-Up', done);
  });
});
