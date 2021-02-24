import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import winston from 'winston';
import compression from 'compression';
import expressWinston from 'express-winston';

import config from './config';
import logger from './utils/logger';
import errorHandler from './utils/error-handler';

const api = express();

api.use(cors());

// middleware
// decreases the downloadable amount of data that’s served to users
// improve the performance of our Node.js applications as our payload size is reduced drastically.
api.use(compression());

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

// middleware to log our HTTP requests
// request and error logging
api.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
    ),
    expressFormat: true,
    meta: false,
  })
);

api.listen(config.server.port, err => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }

  require('./utils/db');

  // ini ngapain cuy??? --> i understand. untuk daftarin routesnya
  fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
    require('./routes/' + file)(api);
  });

  api.route('/').get((req, res) => {
    res.send('Welcome to Method Base Management System');
  });

  api.use(errorHandler);

  logger.info(
    `API is now running on port ${config.server.port} in ${config.env} mode`
  );
});

module.exports = api;
