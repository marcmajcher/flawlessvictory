'use strict';

/* eslint-env node */

const playtestDb = 'playtests';
const Model = require('./_model');

const Playtest = new Model(playtestDb);

module.exports = Playtest;
