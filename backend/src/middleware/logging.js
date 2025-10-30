// Logging middleware for monitoring
import fs from "fs";
import path from "path";

const logsDir = "./logs";

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Get current date for log file naming
const getLogFileName = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}.log`;
};

const logFile = path.join(logsDir, getLogFileName());

export const loggingMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get("user-agent"),
    };

    // Log to file
    const logEntry = JSON.stringify(log);
    fs.appendFileSync(logFile, logEntry + "\n");

    // Also log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(logEntry);
    }
  });

  next();
};

export const errorLoggingMiddleware = (err, req, res, next) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  };

  const logEntry = JSON.stringify(errorLog);
  const errorLogFile = path.join(logsDir, `error-${getLogFileName()}`);
  fs.appendFileSync(errorLogFile, logEntry + "\n");

  if (process.env.NODE_ENV === "development") {
    console.error(logEntry);
  }

  next();
};
