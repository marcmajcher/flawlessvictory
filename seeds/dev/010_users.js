'use strict';

/* eslint-env node */

const User = require('../../app/models/user');

const user1 = {
  gid: '102098633240232549662',
  email: 'majcher@gmail.com',
  firstname: 'Marc',
  lastname: 'Majcher',
  photourl: 'https://lh4.googleusercontent.com/-5stAi6yK6co/AAAAAAAAAAI/AAAAAAAACyI/561_wDdx5CQ/s96-c/photo.jpg',
  locale: 'en',
  role: 'admin'
};

exports.seed = knex => knex('users').del()
  .then(() => User.create(user1, true));
