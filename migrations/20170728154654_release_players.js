'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('release_player', (table) => {
  table.integer('releaseid').unsigned().references('releases.id').onDelete('CASCADE');
  table.integer('playerid').unsigned().references('users.id').onDelete('CASCADE');
});

exports.down = knex => knex.schema.dropTable('release_player');
