const logger = require("./logger");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const handler = require("./app/server");
const app = handler.getAppServer();
const httpServer = app.listen(PORT, () => {
  logger.info("server started at http://localhost:" + PORT);
});