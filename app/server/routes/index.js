const { readdirSync } = require("fs");
const path = require("path");
const express = require("express");
const {
  requireApiAuthentication,
} = require("../../middlewares/checkAuthToken");
const router = express.Router();

const base_path = process.env.BASE_PATH || "";

const getRouteFiles = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => !dirent.isDirectory() && dirent.name.includes("routes"))
    .map((dirent) => dirent.name);

const routeFiles = getRouteFiles(path.resolve(__dirname, "./"));

// defaultRouter.use(requireApiAuthentication("default"));
routeFiles.forEach((file) => {
  const routePrefix = file.split('.')[0]; // Gets 'facebook' from 'facebook.routes.js'
  router.use(`${base_path}/${routePrefix}`, require(`./${file}`));
});

module.exports = router;
