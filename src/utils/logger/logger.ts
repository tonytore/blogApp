import winston, { Logger } from 'winston';
import appConfig from '../../config/app_configs.js';
import LokiTransport from 'winston-loki';

const winstonLogger = (
  lokiUrl: string,
  name: string,
  level: string,
  nodeEnv: 'development' | 'production',
): Logger => {
  const options = {
    console: {
      level,
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize({ all: true }),
        winston.format.printf(({ level, message, label, timestamp }) => {
          return `${timestamp} [${label || name}] ${level}: ${message}`;
        }),
      ),
      json: false,
    },
    file: {
      level: level,
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.printf(({ level, message, label, timestamp }) => {
          return `${timestamp} [${label || name}] ${level}: ${message}`;
        }),
      ),
    },
    loki: {
      labels: { app: name, environment: nodeEnv },
      level,
      host: lokiUrl,
      format: winston.format.json(),
      replaceTimestamp: true,
      onConnectionError: (err: unknown) => console.error(err),
    },
  };

  let transports: winston.transport[] = [];

  if (nodeEnv === 'development') {
    transports = [
      new winston.transports.Console(options.console),

      new winston.transports.File({
        ...options.file,
        filename: 'logs/error.log',
        level: 'error',
      }),

      new winston.transports.File({
        ...options.file,
        filename: 'logs/app.log',
      }),

      new LokiTransport(options.loki),
    ];
  } else {
    transports = [
      new winston.transports.File({
        ...options.file,
        filename: 'logs/error.log',
        level: 'error',
      }),

      new winston.transports.File({
        ...options.file,
        filename: 'logs/app.log',
      }),

      new LokiTransport(options.loki),
    ];
  }

  const logger: Logger = winston.createLogger({
    exitOnError: false,
    defaultMeta: { service: name },
    transports: transports,
  });

  return logger;
};

const logger = winstonLogger(
  appConfig.LOKI_URL || 'http://116.202.87.235:3100',
  appConfig.APP_NAME || 'ESL Backend',
  'info',
  appConfig.NODE_ENV || 'development',
);

export { logger };
