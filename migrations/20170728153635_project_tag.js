'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('project_tag', (table) => {
  table.integer('projectid').unsigned().references('projects.id').onDelete('CASCADE');
  table.string('tag').notNullable();
});

exports.down = knex => knex.schema.dropTable('project_tag');
