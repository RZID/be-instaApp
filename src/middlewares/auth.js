const { isEmpty } = require("../helpers/formValidation");
const jwt = require("../helpers/jwt");
const responser = require("../helpers/responser");
module.exports = {
  login: async (req, res, next) => {
    const emptyCheck = await isEmpty(req.headers, ["authorization"]);
    if (emptyCheck.length > 0)
      return responser.unauthorized_401(
        res,
        "Sign in to continue access to this feature"
      );
    jwt
      .verifyToken(req.headers.authorization)
      .then((response) => {
        req.credentials = response;
        return next();
      })
      .catch(() =>
        responser.conflict_409(
          res,
          "Your token is invalid! Please re-login your account!"
        )
      );
  },
};
