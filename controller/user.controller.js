const db = require("../config/db.config");
const { generateToken } = require("../utils/jwt.util");
const { hashPassword, comparePassword } = require("../utils/password.util");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await db.execute("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    if (user.length > 0) {
      const compare_password = await comparePassword(
        password,
        user[0].password
      );
      if (compare_password) {
        const payload = {
          id: user[0].user_id,
          email: user[0].email,
          role: user[0].user_type,
        };
        const jwt = await generateToken(payload);

        res.status(200).send({
          success: true,
          message: "Login Successfull.",
        });
      } else {
        res.status(200).send({
          success: true,
          message: "Password is incorrect.",
        });
      }
    } else {
      res.status(200).send({
        success: true,
        message: "No user found with this email.",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = loginUser;
