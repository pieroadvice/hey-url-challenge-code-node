'use strict';

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('urls').del()
    .then(() => {
      // Inserts seed entries
      return knex('urls').insert([
        { id: 1, short: '9Jhuj', long: 'http://google.com', created_at: '2020-04-03' },
        { id: 2, short: 'v7UHf', long: 'http://facebook.com', created_at: '2020-04-03' },
        { id: 3, short: 'aThYu', long: 'http://github.com', created_at: '2020-04-03' }
      ]);
    });
};
