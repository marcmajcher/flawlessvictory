'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('project_release', (table) => {
  table.integer('projectid').unsigned().references('projects.id').onDelete('CASCADE');
  table.integer('releaseid').unsigned().references('releases.id').onDelete('CASCADE');
});

exports.down = knex => knex.schema.dropTable('project_release');
