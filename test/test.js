'use strict';

require('dotenv').config({ path: '.env' });
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server');

const config = {
  client: 'mysql',
  debug: true,
  connection: {
    host: process.env.MYSQL_SERVER,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'test_database'
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};
const knex = require('knex')(config);
const PORT = process.env.PORT || 5000;
const HOST = `http://localhost:${PORT}`;

before(async () => {
  return require('./config')()
    .then(async () => {
      await knex.migrate.latest();
      return await knex.seed.run();
    });
});
after(() => {
  // also maybe it is a good idea to delete the testing db on complete ??
  return knex.migrate
    .rollback()
    .then(() => knex.destroy());
});
describe('test suite description', () => {
  it('should accept valid data and return 302 redirection status', (done) => {
    const goodReq = {
      fullUrl: 'http://pierosacco.com'
    };
    request(HOST)
      .post('/shortUrls')
      .send(goodReq)
      // here maybe check the html content using cheerio
      // .expect((res) => {
      //   expect(res.body).to.include(goodReq);
      // })
      .expect(302)
      .expect('Location', '/')
      .end(done);
  });
});
