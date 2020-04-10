'use strict';

require('dotenv').config({ path: '.env' });

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_SERVER,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      options: {
        encrypt: true
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
