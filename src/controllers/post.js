const post = require("../models/posts");
const user = require("../models/users");
const responser = require("../helpers/responser");
module.exports = {
  getUserWithPost: async (req, res) => {
    try {
      const userData = await user.findById(req.params.id);
      if (!userData) return responser.notFound_404(res, "Oops, user not found");

      const postsData = await post.find({ userId: req.params.id });

      return responser.ok_200(res, "Success getting user and post", {
        user: { name: userData.fullname, email: userData.email },
        posts: postsData,
      });
    } catch (error) {
      return responser.internalServerError_500(
        res,
        "Oops, an error occured",
        error
      );
    }
  },
  addPost: async (req, res) => {
    try {
      const userId = req.credentials.id;
      const files = req.files ? req.files.map((el) => el.filename) : null;
      const description = req.body.description;
      if (!files && !description)
        return responser.badRequest_400(
          res,
          "Oops, no data received. Don't make empty post!"
        );
      await post.create({
        userId: userId,
        image: files,
        description: description,
      });
      return responser.ok_200(res, "Success create new post!");
    } catch (error) {
      return responser.internalServerError_500(
        res,
        "Oops, an error occured",
        error
      );
    }
  },
  getRandomPost: async (req, res) => {
    try {
      const postData = await post.aggregate([{ $sample: { size: 10 } }]);
      console.log(await data);
      responser.ok_200(res, "Success get random posts", await data);
    } catch (error) {
      return responser.internalServerError_500(
        res,
        "Oops, an error occured",
        error
      );
    }
  },
};
