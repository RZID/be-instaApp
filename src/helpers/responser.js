const responsers = {
  responseStandard: (res, statusCode, statusMessage, message, data) => {
    res.status(statusCode).json({
      status: {
        statusCode,
        statusMessage,
        message,
      },
      data,
    });
  },

  // 200
  ok_200: (res, message, data, pagination) =>
    responsers.responseStandard(res, 200, "OK", message, { data, pagination }),

  created_201: (res, message) =>
    responsers.responseStandard(res, 201, "Created", message),

  // 400
  badRequest_400: (res, message) =>
    responsers.responseStandard(res, 400, "Bad Request", message),

  unauthorized_401: (res, message) =>
    responsers.responseStandard(res, 401, "Unauthorized", message),

  forbidden_403: (res, message) =>
    responsers.responseStandard(res, 403, "Forbidden", message),

  notFound_404: (res, message) =>
    responsers.responseStandard(res, 404, "Not Found", message),

  conflict_409: (res, message) =>
    responsers.responseStandard(res, 409, "Conflict", message),

  // 500
  internalServerError_500: (res, message, trace) =>
    responsers.responseStandard(
      res,
      500,
      "Internal Server Error",
      message,
      trace
    ),
};
module.exports = responsers;
