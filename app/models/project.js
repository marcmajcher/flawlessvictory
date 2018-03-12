'use strict';

/* eslint-env node */

const projectDb = 'projects';
const creatorProjectDb = 'creator_project';
const Model = require('./_model');
const util = require('../util');

const Project = new Model(projectDb);

Project.create = (data, creatorid) => util.knex(projectDb).insert(data, '*')
  .then(response => util.knex(creatorProjectDb).insert({
    creatorid,
    projectid: response[0].id,
    role: 'creator'
  }));

module.exports = Project;
