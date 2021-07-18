const jwt = require("jsonwebtoken");
const env = require("../helpers/env");

module.exports = {
  signToken: (data) => {
    return new Promise((resolve, reject) => {
      jwt.sign(data, env.jwt.secret, (err, token) => {
        if (err) reject(err);
        else resolve(token);
      });
    });
  },
  verifyToken: (data) => {
    return new Promise((resolve, reject) => {
      jwt.verify(data, env.jwt.secret, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
  },
};
