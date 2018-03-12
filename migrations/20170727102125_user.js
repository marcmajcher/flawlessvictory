'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('users', (table) => {
  table.increments();
  table.string('gid').unique().notNullable();
  table.string('email');
  table.string('firstname');
  table.string('lastname');
  table.string('photourl');
  table.string('locale');
  table.enu('role', ['user', 'admin']).defaultTo('user');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('users');
