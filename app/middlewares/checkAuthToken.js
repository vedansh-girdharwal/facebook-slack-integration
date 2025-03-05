const { UnauthorizedError } = require("../common/utils/errors.utils");
const { isValidJson } = require("../common/utils/validator.utils");
const logger = require("../../logger");

const requireApiAuthentication = () => {
  return async (req, res, next) => {
    try {
      let tenant_id = parseHeader(req.headers["x-tenant-id"]) || "";
      let user_id = parseHeader(req.headers["x-user-id"]) || "";
      user_id =
        isValidJson(user_data) && user_data.email ? user_data.email : user_id;
      tenant_id = isValidJson(account_data) && tenant_id;

      logger.debug("USER_ID: " + user_id);

      if (tenant_id && user_id) {
        req.orgId = getOrgId(org_id, org_data);
        req.tenant_config = {
          email: user_id,
          tenant_id: tenant_id,
          org_id: req.orgId,
        };
        next();
        return;
      }
      next(new UnauthorizedError("Authorization headers missing"));
    } catch (error) {
      next(new UnauthorizedError(error));
    }
  };
};

const parseHeader = (str) => {
  if (typeof str === "string") {
    try {
      str = JSON.parse(str);
    } catch (e) {
      if (e.message === "Unexpected token ' in JSON at position 0") {
        str = str.slice(1, -1);
        return parseHeader(str);
      }
    }
  }
  return str;
};

const getOrgId = (orgId, orgData) => {
  if (orgId) {
    return orgId.trim();
  } else if (orgData) {
    let org =
      typeof orgData === "string"
        ? JSON.parse(orgData)
        : isValidJson(orgData)
        ? orgData
        : {};
    if (Object.keys(org).length === 0 || !org._id) {
      return;
    } else {
      return org._id.trim();
    }
  } else {
    return;
  }
};

module.exports = { requireApiAuthentication };
