'use strict';

/* eslint-env mocha, node */

const config = require('../knexfile').test;
const knex = require('knex')(config);

module.exports = {
  knex,
  rollback: (done) => {
    knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() =>
        knex.seed.run().then(() => {
          done();
        })
      );
    });
  },
  getCookie: res =>
    res.headers['set-cookie'].map(r =>
      r.replace('; path=/; httponly', ''))
    .join('; '),
};
