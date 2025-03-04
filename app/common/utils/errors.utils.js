const { isNonEmptyString } = require("./validator.utils.js");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
    this.errorCode = "SFI-401";
    this.status = 401;
  }
}

class HttpError extends Error {
  constructor(status, message, error) {
    super(message || error?.message || "");
    this.name = message || error?.message || "";
    this.errorCode = `SFI-${status}`;
    this.status = status;
  }
}

class ClientError extends HttpError {
  constructor(error, message) {
    super(400, error?.message || "", error);
  }
}

class BadRequestError extends HttpError {
  constructor(message = "", error) {
    const msg = "Bad Request";
    message = isNonEmptyString(message) ? message : error?.message || msg;
    error.message = error.message || message;
    super(400, message, error);
  }
}

class NotFoundError extends HttpError {
  constructor(message = "", error) {
    const msg = "Not Found";
    message = isNonEmptyString(message) ? message : error?.message || msg;
    error.message = error.message || message;
    super(404, message, error);
  }
}

class ConflictError extends HttpError {
  constructor(message = "", error) {
    const msg = "Conflict";
    message = isNonEmptyString(message) ? message : error?.message || msg;
    error.message = error.message || message;
    super(409, message, error);
  }
}

class PlainServerError extends HttpError {
  constructor(error) {
    super(500, error?.message, error);
  }
}

class ServerError extends HttpError {
  constructor(message, error) {
    super(500, message, error);
  }
}

module.exports = {
  UnauthorizedError,
  HttpError,
  ServerError,
  ClientError,
  PlainServerError,
  BadRequestError,
  NotFoundError,
  ConflictError,
};
