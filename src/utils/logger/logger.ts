import appConfig from "@/config/app_configs";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";


const { combine, errors, timestamp, json, printf, colorize } = format

const logger = createLogger({
  level: appConfig.LOG_LEVEL || "info",
  format: combine(
    timestamp(),
    json(),
    errors({ stack: true }),
    printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    colorize()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

const fileRotateTransport = new DailyRotateFile({
  filename: "logs/application%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "14d",
  format: combine(
    timestamp(),
    json(),
    errors({ stack: true })
  ),
})

logger.add(fileRotateTransport)

export { logger };
