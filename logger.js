// logger.js
const { createLogger, format, transports } = require('winston');
require('dotenv').config();  // Load environment variables from .env

// Read the logger level from environment variables
const loggerLevel = process.env.LOGGER_LEVEL || 'info';  // Default to 'info' if not specified

const logger = createLogger({
  level: loggerLevel,  // Use logger level from .env
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'buddy-service' },
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;