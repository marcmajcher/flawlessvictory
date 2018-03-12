'use strict';

/* eslint-env node */

exports.up = knex => knex.schema.createTable('creator_project', (table) => {
  table.integer('creatorid').unsigned().references('users.id').onDelete('CASCADE');
  table.integer('projectid').unsigned().references('projects.id').onDelete('CASCADE');
  table.string('role').notNullable().defaultTo('contributor');
});

exports.down = knex => knex.schema.dropTable('creator_project');
