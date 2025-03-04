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

    // if (conf.get("app_env") === AppEnv.DEVELOPMENT) {
    //     corsOptions = {
    //         origin: true,
    //         credentials: true,
    //     };
    // }

    callback(null, corsOptions);
  };

  // if (conf.get("app_env") === AppEnv.DEVELOPMENT && conf.get("enableCORS")) {
  const setCORS = cors(corsAllowedDomain);
  app.use(setCORS);
  // }

  // Uncomment this file and run when you have some change in swagger/index.json

  // convert swagger json to yaml
  // console.log("--- GENERATING YAML -----")
  // const files = glob.sync(
  //     `${path.resolve(__dirname, "./swagger")}/**/*.json`,
  //     {}
  // );

  // files.forEach((f) => {
  //     let payload = require(f);
  //     let ymlText = YAML.stringify(payload);
  //     const ymlPath = f.replace("json", "yaml");
  //     fs.writeFileSync(ymlPath, ymlText);
  // })

  app.use(router);

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((error, req, res, next) => {
    // logging error

    // try {
    //     const blackListUrls = ["/grafana.json"];
    //     if (blackListUrls.some((url) => req.originalUrl.includes(url))) {
    //         return res.status(200).json({ ok: "ok" });
    //     }
    //     if (error.name === "TypeError" || error.name === "MongoServerError") {
    //         let meta = {
    //             name: error.name,
    //             message: error.message,
    //             stack: error.stack,
    //         };
    //         logger.error(this, { errorCode: error.errorCode, error_meta: meta });
    //     } else {
    //         logger.error(this, {
    //             errorCode: error.errorCode,
    //             error_meta: error,
    //             req_url: `${req.originalUrl}`,
    //             error_stack: error.stack,
    //         });
    //     }
    //     Sentry.captureException(error, {
    //         extra: {
    //             url: req.originalUrl,
    //         },
    //     });
    // } catch (e) {
    //     logger.error(this, {
    //         errorCode: e.errorCode,
    //         error_meta: JSON.stringify(e),
    //         req_url: ` ${req.originalUrl}`,
    //         error_stack: e.stack,
    //     });
    // }

    const errorResponse = routeUtils.formatErrorResponse(error, req);
    logger.info("Error response: ", errorResponse);
    res.type("application/json");
    res.status(errorResponse.status).json(errorResponse);
  });

  return app;
}

exports.getAppServer = getAppServer;
