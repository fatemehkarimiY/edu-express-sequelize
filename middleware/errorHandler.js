

function ErrorHandler(err, req, res, next) {
  const status = err?.status || err?.statusCode || 500;
  res.status(status).json({
    statusCode: status,
    message: err?.message ?? err?.stack ?? "IntervalServerError",
    err
  });
}

module.exports = {
  ErrorHandler,
};
