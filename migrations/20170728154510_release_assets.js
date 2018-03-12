'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('release_asset', (table) => {
  table.integer('releaseid').unsigned().references('releases.id').onDelete('CASCADE');
  table.string('description').notNullable();
  table.string('url').notNullable();
});

exports.down = knex => knex.schema.dropTable('release_asset');
