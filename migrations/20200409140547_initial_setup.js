'use strict';

const migrate = require('widget-knex-schema');

exports.up = (knex) => {
  return Promise.all([
    migrate.createTable(knex, 'urls', {
      id: { type: 'increments', nullable: false, primary: true, unique: true },
      short: { type: 'string', maxlength: 5, nullable: false, unique: true },
      long: { type: 'string', maxlength: 500, nullable: false, unique: true },
      created_at: { type: 'date', nullable: false }
    }, false),
    migrate.createTable(knex, 'hit_history', {
      id: { type: 'increments', nullable: false, primary: true, unique: true },
      url_id: { type: 'integer', nullable: false, unsigned: true, references: 'urls.id' },
      platform: { type: 'string', maxlength: 80, nullable: false },
      browser: { type: 'string', maxlength: 80, nullable: false },
      created_at: { type: 'date', nullable: false }
    }, false)
  ]);
};

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTableIfExists('hit_history'),
    knex.schema.dropTableIfExists('urls')
  ]);
};
