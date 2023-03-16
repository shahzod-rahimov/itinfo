const config = require("config");
require("winston-mongodb");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, json, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// let logger;

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({
      filename: "logs/errors.log",
      level: "error",
    }),
    new transports.File({ filename: "logs/combined.log", level: "info" }),
    new transports.MongoDB({
      db: config.get("dbUri"),
      options: { useUnifiedTopology: true },
    }),
  ],
  exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],
  rejectionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],
});

// if(process.env.NODE_ENV == "production"){
//   logger = prodLog
// }else{
//   logger = devLog
// }

module.exports = logger;
