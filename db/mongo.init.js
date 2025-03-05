const mongoose = require("mongoose");
const logger = require("../logger");

function connect() {
  const MONGO_URI = process.env.MONGO_URI;
  mongoose
    .set("strictQuery", false)
    .connect(MONGO_URI, {dbName: "slack-facebook-integration"})
    .then(() => {
      logger.info("MongoDB connected to database");
    })
    .catch((err) => {
      logger.error("Error connecting mongodb", err);
    });
}

exports.connect = connect;
