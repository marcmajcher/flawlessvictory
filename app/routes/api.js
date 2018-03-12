'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.get('/', (req, res) => {
  res.send({
    api: 'ok'
  });
});

/* Projects */

/* create new project */
router.post('/project', (req, res, next) => {
  Project.create(req.body, req.session.user.id)
    .then(() => {
      res.send({
        status: 'ok'
      });
    })
    .catch((error) => {
      const err = new Error(`Error creating project: ${error}`);
      err.status = 500;
      next(err);
    });
});

module.exports = router;
