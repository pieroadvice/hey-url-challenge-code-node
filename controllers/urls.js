'use strict';

const moment = require('moment');
const Urls = require('../models/urls');
const Clicks = require('../models/clicks');
const { validationResult } = require('express-validator');


exports.get_index = async (req, res) => {
  let shortUrls = [];
  try {
    shortUrls = await Urls.fetchAll({ withRelated: ['clicks'] });
    shortUrls = shortUrls.serialize();
  } catch (error) {
    console.log(error);
  }
  res.render('index', { shortUrls });
};

exports.submit_url = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    req.session.sessionFlash = {
      type: 'error',
      message: errors.array().map(error => error.msg).join('. ')
    };
  } else {
    try {
      let url = new Urls({ long: req.body.fullUrl });
      await url.save(null, { method: 'insert' });
      req.session.sessionFlash = {
        type: 'notice',
        message: 'The short url has been successfuly created!'
      };
    } catch (error) {
      req.session.sessionFlash = {
        type: 'error',
        message: 'Opss, something went wrong! please try again.'
      };
    }
  }
  res.redirect('/');
};

exports.get_url = async (req, res) => {
  console.log(req.params.shortUrl);
  let browser = req.useragent.browser;
  let platform = req.useragent.platform;
  let url;
  try {
    url = await Urls.where({ short: req.params.shortUrl }).fetch({ withRelated: ['clicks'] });
  } catch (error) {
    return res.status(404).render('404.ejs');
  }
  await Clicks.forge({
    url_id: url.get('id'),
    platform,
    browser
  }).save();
  res.redirect('/');
};

exports.url_stats = async (req, res) => {
  let url;
  try {
    url = await Urls.where({ short: req.params.shortUrl }).fetch({ withRelated: ['clicks'] });
  } catch (error) {
    return res.status(404).render('404.ejs');
  }
  let clicks = await Clicks.where({ url_id: url.get('id') }).fetchAll();
  let by_date = [[]];
  let by_platform = [[]];
  let by_browser = [[]];
  if (clicks.length !== 0) {
    by_date = clicks.groupBy('created_at');
    by_date = Object.entries(by_date).map(platform => {
      let date = new Date(platform[0]);
      //JSON.stringify(date).split('T')[0], 'YYYY-MM-DD'
      return [moment(date).format('DD-MM-YY'), platform[1].length];
    });
    by_platform = clicks.groupBy('platform');
    by_platform = Object.entries(by_platform).map(platform => [platform[0], platform[1].length]);
    by_browser = clicks.groupBy('browser');
    by_browser = Object.entries(by_browser).map(browser => [browser[0], browser[1].length]);
  }
  res.render('stats', { url: url.serialize(), by_date, by_platform, by_browser });
};
