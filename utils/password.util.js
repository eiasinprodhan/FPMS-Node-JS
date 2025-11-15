const bcrypt = require("bcryptjs");

// Hash password
exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 12); // 12 হল saltRounds, এটি সিকিউরিটি বাড়ায়
};

// Compare password with hashed password
exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash); // বার্থকুলির মিল পরীক্ষা করবে
};
