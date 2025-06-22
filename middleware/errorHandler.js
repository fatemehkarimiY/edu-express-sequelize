function ErrorHandler(err, req, res, next) {
  const status = err?.status || err?.statusCode || 500;
  let errors = err;
  if (err.name === "ValidationError") {
    errors = err.details?.body?.map((b) => b.message);
  }
  res.status(status).json({
    statusCode: status,
    message: err?.message ?? err?.stack ?? "IntervalServerError",
    err:errors,
  });
}

module.exports = {
  ErrorHandler,
};
