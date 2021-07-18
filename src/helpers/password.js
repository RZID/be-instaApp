const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  generatePassword: (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (!err) resolve(hash);
        else reject(err);
      });
    });
  },
  comparePassword: (plain, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plain, hash, (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      });
    });
  },
};
