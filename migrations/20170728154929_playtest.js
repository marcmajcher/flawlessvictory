'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('playtests', (table) => {
  table.increments();
  table.integer('releaseid').unsigned().references('releases.id').onDelete('CASCADE');
  table.dateTime('time').notNullable().defaultTo(knex.raw('now()'));
  table.string('location');
  table.string('type');
  table.integer('numplayers').notNullable();
  table.string('feedback').notNullable();
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('playtests');
