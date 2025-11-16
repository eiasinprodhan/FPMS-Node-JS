const bcrypt = require("bcryptjs");

// Hash password
exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

// Compare password with hashed password
exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
