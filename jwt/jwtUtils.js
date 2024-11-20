const jwt = require("jsonwebtoken");
exports.generateToken = (payload) => {
  const secretKey = "Demo@123";
  const time = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, secretKey, time);
  return token;
};
