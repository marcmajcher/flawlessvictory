'use strict';

/* eslint-env node */

const config = require('../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

module.exports = {
  knex,
  /*
  loginRequired: (req, res, next) => {
    if (req.session.user) {
      next();
    }
    else {
      req.flash('Create an account or log in to access this page.');
      res.redirect('/');
    }
  },
  adminRequired: (req, res, next) => {
    if ((process.env.NODE_ENV === 'development') ||
      (req.session.user && req.session.user.role === 'admin')) {
      next();
    }
    else {
      const err = new Error('You are not admin');
      err.status = 500;
      next(err);
    }
  }
  */
};
