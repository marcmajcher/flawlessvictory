'use strict';

/* eslint-env mocha, node */

const app = require('../app/app.js');
const request = require('supertest');
const util = require('./_util');

describe('Smoke Test', () => {
  before(util.rollback);

  it('should respond with booyah', (done) => {
    request(app)
      .get('/booyah')
      .set('Accept', 'text/html')
      .expect('Content-Type', /text/)
      .expect(200)
      .expect('booyah', done);
  });
});
