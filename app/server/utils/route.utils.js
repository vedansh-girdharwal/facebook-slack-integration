const { validationResult } = require("express-validator");
const routeUtils = {
    validate: (req, res, next) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg);

        if (errors.isEmpty()) {
            next();
        } else {
            throw routeUtils.formatValidateError(errors);
        }
    },

    formatValidateError: (errors) => {
        const error = new Error("Unexpected input value");
        error.errorCode = "app-error";
        error.status = 404;
        error.meta = { errors: errors.mapped() };
        error.name = "ValidationError";
        return error;
    },

    formatErrorResponse: (error, req) => {
        error = error || {};
        const status = error.status || 500;

        const errorResponse = {
            message:
                status === 500
                    ? "We're unable to process your request at the moment"
                    : error.customMessage || error.message,
            status,
            code: 500,
            exception: error.name,
        };
        if (error.meta) {
            errorResponse.meta = error.meta;
        }

        return errorResponse;
    },
};

module.exports = routeUtils;
