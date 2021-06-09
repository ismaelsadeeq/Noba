const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./config/middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);

app.get('/', (req, res) => {
  res.json({
    message: 'Api Work from home page to connect check the api path from the appJS'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
