'use strict';

const bookshelf = require('../config/bookshelf');
let shortid = require('shortid-extend');
shortid.config({
  disableDefaultAlphabetLength: true,
  disableDefaultIdLength: true,
  idLength: 5
});
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

module.exports = bookshelf.model('Urls', {
  hasTimestamps: true,
  tableName: 'urls',
  clicks() {
    return this.hasMany('Clicks');
  },
  initialize() {
    this.on('saving', (model, attrs) => {
      attrs.short = shortid.generate();
      delete attrs.updated_at;
    });
  }
});
