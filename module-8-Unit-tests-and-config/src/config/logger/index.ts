import devLogger from './dev-logger';
import prodLogger from './prod-logger';

let logger: any = null;

if (process.env.NODE_ENV === 'development') {
  logger = devLogger;
} else {
  logger = prodLogger;
}

export default logger;
