'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const useragent = require('express-useragent');
const swaggerDoc = require('./swaggerDoc');
const routes = require('./routes/routes');
let sessionStore = new session.MemoryStore();
swaggerDoc(app);
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(session({
  cookie: { maxAge: 60000 },
  store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}));
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

app.use(useragent.express());
app.use('/', routes);
// app.use((req, res) => {
//   res.status(404).render('404.ejs');
// });

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('=======', err.stack);
  res.status(500).render('500.ejs');
});
app.use((req, res) => {
  res.status(404).render('404.ejs');
});

process.stderr.on('data', (data) => {
  console.log(data);
});
process.on('unhandledRejection', (err) => {
  console.log('======================= unhandledRejection =======================', err);
  process.exit(1);
});

app.listen(process.env.PORT || 5000);

module.exports = app;
