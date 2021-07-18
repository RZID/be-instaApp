const model = require("../models/users");
const responser = require("../helpers/responser");
const { isEmpty } = require("../helpers/formValidation");
const { generatePassword, comparePassword } = require("../helpers/password");
const { signToken } = require("../helpers/jwt");

module.exports = {
  login: async (req, res) => {
    try {
      const emptyCheck = await isEmpty(req.body, ["identity", "password"]);
      if (emptyCheck.length > 0)
        return responser.badRequest_400(
          res,
          `Oops, ${emptyCheck.join(", ")} is required!`
        );

      const userData = await model.findOne({
        $or: [{ email: req.body.identity }, { username: req.body.identity }],
      });
      if (!userData)
        return responser.notFound_404(res, "Username / email is unregistered!");

      const comparePw = await comparePassword(
        req.body.password,
        userData.password
      );
      if (!comparePw) return responser.badRequest_400(res, "Wrong password!");

      return responser.ok_200(res, "Success login!", {
        token: await signToken({ id: userData._id, email: userData._email }),
        userData: {
          id: userData._id,
          name: userData.fullname,
          username: userData.username,
          image: userData.image,
        },
      });
    } catch (error) {
      return responser.internalServerError_500(
        res,
        "Oops, an error occured",
        error
      );
    }
  },
  register: async (req, res) => {
    try {
      const emptyCheck = await isEmpty(req.body, [
        "email",
        "fullname",
        "password",
        "username",
      ]);
      if (emptyCheck.length > 0)
        return responser.badRequest_400(
          res,
          `Oops, ${emptyCheck.join(", ")} is required!`
        );
      const uniqueCheck = await model.find({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      });
      if (uniqueCheck.length > 0)
        return responser.badRequest_400(
          res,
          "That username / email is already registered!"
        );

      await model.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: await generatePassword(req.body.password),
        username: req.body.username,
      });
      return responser.ok_200(res, "OK!");
    } catch (error) {
      console.log(error);
      return responser.internalServerError_500(res, "Oops, an error occured", {
        stringify: JSON.stringify(error),
        raw: error,
      });
    }
  },
};
