/* eslint-disable max-len */
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

/**
 * @swagger
 * /:
 *    get:
 *      tags: 
 *      - "home"
 *      summary: This should render the home page. It includes the form to create a new short url and a table with the list of short urls created
 *      description: This should render the home page. It includes the form to create a new short url and a table with the list of short urls created
 *      responses:
 *        200:
 *          description: successful operation
 *          content:
 *            text/html:
 *              schema:
 *                type: string
 *                description: The home html
 */
router.get('/', get_index);
/**
 * @swagger
 * /shortUrls:
 *    post:
 *      tags:
 *      - "submitUrls"
 *      summary: This should create a short url and then redirect to the home page
 *      description: This should create a short url and then redirect to the home page
 *      operationId: updatePetWithForm
 *      requestBody:
 *        content:
 *          'application/x-www-form-urlencoded':
 *            schema:
 *              properties:
 *                fullUrl:
 *                  description: full url to be shortened, including the protocol (http/https)
 *                  type: string
 *              required:
 *              - fullUrl
 *            example:
 *              fullUrl: http://example-url.com
 *      responses:
 *        302:
 *          description: successful operation, redirects to home page
 *          content:
 *            text/html:
 *              schema:
 *                type: string
 *                description: The home html
 */
router.post('/shortUrls', submit_url_validations, submit_url);
router.get('/shortUrl/:shortUrl', url_stats);
router.get('/:shortUrl', get_url);

module.exports = router;
