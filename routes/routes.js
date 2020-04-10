/* eslint-disable new-cap */
'use strict';

const { get_index, submit_url, get_url, url_stats } = require('../controllers/urls');
const Urls = require('../models/urls');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const submit_url_validations = [
  check('fullUrl').isLength({ min: 10, max: 500 }).withMessage('Invalid url length')
    .isURL({ protocols: ['http', 'https'] }).withMessage('That is not a valid Url')
    .custom(value => {
      return Urls.where({ long: value }).fetch()
        .then(() => Promise.reject('That url is already in our system'))
        .catch(error => {
          if (!!error.message && error.message === 'EmptyResponse') {
            return true;
          }
          return Promise.reject(error);
        });
    })
];

router.get('/', get_index);
router.post('/shortUrls', submit_url_validations, submit_url);
router.get('/:shortUrl/stats', url_stats);
router.get('/:shortUrl', get_url);

module.exports = router;
