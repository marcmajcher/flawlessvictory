'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('releases', (table) => {
  table.increments();
  table.string('stage').notNullable().defaultTo('dev');
  table.integer('majorversion').notNullable().defaultTo(0);
  table.integer('minorversion').notNullable().defaultTo(0);
  table.integer('revision').notNullable().defaultTo(0);
  table.string('notes');
  table.enu('visibility', ['private', 'public', 'closed']).defaultTo('private');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('releases');
