'use strict';

/* eslint-env node */

const releaseDb = 'releases';
const Model = require('./_model');

const Release = new Model(releaseDb);

module.exports = Release;
