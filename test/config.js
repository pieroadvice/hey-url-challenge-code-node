'use strict';
require('dotenv').config({ path: '.env' });
const knex = require('knex');

function getDbConnection() {
  return knex({
    client: 'mysql',
    debug: false,
    connection: {
      host: process.env.MYSQL_SERVER,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    }
  });
}

async function createDatabase() {
  const dbConnection = getDbConnection();

  try {
    await dbConnection.raw('CREATE DATABASE IF NOT EXISTS test_database ');
  } catch (err) {
    console.log(err);
  } finally {
    await dbConnection.destroy();
  }
}

module.exports = async () => {
  await createDatabase();
};