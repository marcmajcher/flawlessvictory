'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('playtest_player', (table) => {
  table.integer('playtestid').unsigned().references('playtests.id').onDelete('CASCADE');
  table.integer('playerid').unsigned().references('users.id').onDelete('CASCADE');
  table.string('feedback');
});

exports.down = knex => knex.schema.dropTable('playtest_player');
