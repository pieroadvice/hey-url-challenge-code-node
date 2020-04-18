'use strict';

require('dotenv').config({ path: '../.env' });

let knex = require('knex')({
  debug: process.env.NODE_ENV !== 'test',
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_SERVER,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? 'test_database' : process.env.MYSQL_DATABASE,
    charset: 'utf8'
  }
});
module.exports = require('bookshelf')(knex);
