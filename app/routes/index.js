'use strict';

/* eslint-env node */

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const GoogleAuth = require('google-auth-library');
const CLIENT_ID = '1079233913624-v8h0hnrrbkalbhf5upetcluuepvt26og.apps.googleusercontent.com';

/* Log user in with Google sign-in */
router.post('/gsignin', (req, res, next) => {
  // https://developers.google.com/identity/sign-in/web/backend-auth
  const token = req.body.idtoken;
  const auth = new GoogleAuth();
  const client = new auth.OAuth2(CLIENT_ID, '', '');

  client.verifyIdToken(token, CLIENT_ID, (e, login) => {
    const payload = login.getPayload();
    if (payload.aud === CLIENT_ID) {
      User.signin(payload)
        .then((response) => {
          if (Array.isArray(response)) {
            response = response[0];
          }

          req.session.user = response;
          res.send(response);
        })
        .catch((error) => {
          const err = new Error(`User GID already exists: ${error}`);
          err.status = 500;
          next(err);
        });
    }
  });
});

/* Log player out and return them to the index page */
router.post('/signout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

/* smoke test route */
router.get('/booyah', (req, res) => {
  res.send('booyah');
});

module.exports = router;
