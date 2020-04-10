'use strict';

const bookshelf = require('../config/bookshelf');

module.exports = bookshelf.model('Clicks', {
  hasTimestamps: true,
  tableName: 'hit_history',
  urls() {
    return this.belongsTo('Urls');
  },
  initialize() {
    this.on('saving', (model, attrs) => {
      delete attrs.updated_at;
    });
  }
});
