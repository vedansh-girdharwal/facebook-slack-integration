const express = require("express");
const createError = require("http-errors");
const init = require("../common/init");
const routeUtils = require("./utils/route.utils");
const router = require("./routes/index.js");
const cors = require("cors");
const logger = require("../../logger");

function getAppServer() {
  init.connectAll();
  const app = express();
  app.use(express.json());
  const allowedHeaders = [
    "Content-Type",
    "Content-Range",
    "Range",
    "authorization",
    "x-source-id",
    "x-user-id",
    "x-user-data",
    "x-tenant-id",
    "x-org-id",
    "x-org-data",
    "x-account-data",
    "x-fc-signature",
    "x-fc-param",
  ];

  const exposedHeaders = [
    "Accept-Ranges",
    "Content-Encoding",
    "Content-Length",
    "Content-Range",
    "Content-Disposition",
  ];

  let corsAllowedDomain = function (req, callback) {
    let corsOptions = {
      origin: "*",
      credentials: true,
      maxAge: 86400,
      allowedHeaders,
      exposedHeaders,
    };

    callback(null, corsOptions);
  };

  const setCORS = cors(corsAllowedDomain);
  app.use(setCORS);

  app.use(router);

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((error, req, res, next) => {
    const errorResponse = routeUtils.formatErrorResponse(error, req);
    logger.info("Error response: ", errorResponse);
    res.type("application/json");
    res.status(errorResponse.status).json(errorResponse);
  });

  return app;
}

exports.getAppServer = getAppServer;
