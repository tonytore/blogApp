import appConfig from "@/config/app_configs";
import winston, { Logger } from "winston";
import LokiTransport from "winston-loki";

interface LoggerOptions {
  serviceName?: string;
  level?: string;
  nodeEnv?: "development" | "production";
  lokiUrl?: string;
  enableLoki?: boolean; // ← New: control Loki separately
  enableConsole?: boolean; // ← Optional: control console in prod too
  logDir?: string; // ← Make log directory configurable
}

const createLogger = (options: LoggerOptions = {}): Logger => {
  const {
    serviceName = appConfig.APP_NAME || "BLOG Backend",
    level = "info",
    nodeEnv = (appConfig.NODE_ENV as "development" | "production") ||
      "development",
    lokiUrl = appConfig.LOKI_URL || "http://116.202.87.235:3100",
    enableLoki = !!appConfig.LOKI_URL && nodeEnv === "production", // auto-enable in prod if URL exists
    enableConsole = nodeEnv === "development",
    logDir = "logs",
  } = options;

  const transports: winston.transport[] = [];

  // 1. Console (only in development by default)
  if (enableConsole) {
    transports.push(
      new winston.transports.Console({
        level,
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          winston.format.printf(({ timestamp, level, message, label }) => {
            const lbl = label || serviceName;
            return `${timestamp} [${lbl}] ${level}: ${message}`;
          }),
        ),
      }),
    );
  }

  // 2. File logs (always in both envs unless disabled)
  transports.push(
    new winston.transports.File({
      filename: `${logDir}/error.log`,
      level: "error",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: `${logDir}/app.log`,
      level,
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        winston.format.json(),
      ),
    }),
  );

  // 3. Loki (conditionally added)
  if (enableLoki && lokiUrl) {
    transports.push(
      new LokiTransport({
        host: lokiUrl,
        labels: { app: serviceName, environment: nodeEnv },
        level,
        format: winston.format.json(),
        replaceTimestamp: true,
        onConnectionError: (err) =>
          console.error("Loki connection error:", err),
      }),
    );
  }

  const logger = winston.createLogger({
    level,
    defaultMeta: { service: serviceName },
    exitOnError: false,
    transports,
  });

  return logger;
};

// Default logger (used in most cases)
const logger = createLogger();

export { logger, createLogger };
