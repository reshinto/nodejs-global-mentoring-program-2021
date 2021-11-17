import winston, { format } from 'winston';
import config from '../index';

const logger = winston.createLogger({
  level: config.logLevel,  // level is info by default
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [new winston.transports.Console()]
});

export default logger;

