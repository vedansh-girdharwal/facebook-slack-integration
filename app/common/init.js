const mongo = require("../../db/mongo.init");

exports.connectAll = () => {
  mongo.connect();
};
