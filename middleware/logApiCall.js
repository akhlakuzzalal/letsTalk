const moment = require("moment");
require("colors");

const logApiCall = (req, res, next) => {
  // Capture start time to calculate the response time
  const startTime = Date.now();

  // Listen to the 'finish' event to log after response is sent
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const status = res.statusCode >= 400 ? "error" : "success";
    const message = `[${status}] --- ${moment().format()} --- ${req.method} ${
      req.originalUrl
    } ${res.statusCode} - ${duration}ms`;

    if (status === "error") {
      console.log(`${message}`.red);
    } else {
      console.log(message.green);
    }
  });

  next();
};

module.exports = logApiCall;
