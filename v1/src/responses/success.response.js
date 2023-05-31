const successResponse = (res, statusCode, data) => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    data,
  });
};

const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = { successResponse, errorResponse };
