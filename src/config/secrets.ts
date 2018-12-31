import dotenv from 'dotenv';
import fs from 'fs';
import logger from '../utils/logger';

if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const MONGODB_URI = prod ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI_LOCAL;

if (!MONGODB_URI) {
    logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
    process.exit(1);
}
