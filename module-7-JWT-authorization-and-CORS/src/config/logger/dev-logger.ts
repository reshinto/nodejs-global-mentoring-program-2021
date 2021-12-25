import winston, { format } from 'winston';
import config from '../index';

const logFormat = format.printf(({ level, message, timestamp, stack }) => `${timestamp} ${level}: ${stack || message}`);

const logger = winston.createLogger({
  level: config.logLevel,  // level is info by default
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.File({ filename: 'stdout.log' })
  ]
});

export default logger;
