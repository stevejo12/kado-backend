import { format, transports, createLogger, LoggerOptions } from "winston";

// configure logger winston
const logConfig: LoggerOptions = {
  "format": format.json(),
  "transports": new transports.File({
    filename: "log/server.log",
    format: format.combine(
      format.timestamp({format: "MMM-DD-YYYY HH:mm:ss"}),
      format.align(),
      format.printf(info =>
        `${info.level}: ${[info.timestamp]}: ${info.message}`
      ),
    )
  })
}
const logger = createLogger(logConfig);

export default logger;