function NotFoundHandler(req, res, next) {
  res.status(404).json({
    statusCode: res.statusCode,
    message: "Not found",
  });
}

module.exports = {
  NotFoundHandler,
};
