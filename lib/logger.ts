const pino = require('pino')
const pretty = require('pino-pretty')

const isDev = process.env.NODE_ENV !== 'production';

const stream = isDev ? pretty({
  colorize: true,
}) : undefined;

const logger = pino({
  level: isDev ? 'debug' : 'info'
  },
  stream
);

export default logger;
