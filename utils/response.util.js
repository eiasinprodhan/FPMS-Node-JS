exports.success = (res, message, data = {}) => {
  res.send({ status: "success", message, ...data }); // API response with status success
};

exports.error = (res, message, error = {}) => {
  res.status(500).send({ status: "error", message, error }); // API response with status error
};
