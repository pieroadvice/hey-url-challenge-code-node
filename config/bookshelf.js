'use strict';

require('dotenv').config({ path: '../.env' });

let knex = require('knex')({
  debug: true,
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_SERVER,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: 'utf8'
  }
});
module.exports = require('bookshelf')(knex);
