import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import { Application } from 'express';

const expressConfig = (app: Application) => {
  // Load environment variables from .env file, where API keys and passwords are configured
  dotenv.config({ path: '.env' });

  // Express configuration
  app.set('uri', process.env.SERVER_URI || 'http://localhost');
  app.set('port', process.env.SERVER_PORT || 3100);
  app.set('env', process.env.NODE_ENV || 'development');
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(expressValidator());

};

export default expressConfig;
