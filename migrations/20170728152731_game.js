'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('projects', (table) => {
  table.increments();
  table.string('title').notNullable().unique();
  table.string('pitch').notNullable();
  table.string('description').notNullable();
  table.integer('minplayers').notNullable().defaultTo(1);
  table.integer('maxplayers').notNullable();
  table.integer('playtime').notNullable(); // time in minutes
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('projects');
