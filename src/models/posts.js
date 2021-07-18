const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = Schema({
  userId: { type: ObjectID, required: true },
  image: Array,
  description: String,
  comments: [{ userId: ObjectID, comments: String }],
  likes: [ObjectID],
});
module.exports = mongoose.model("post", postSchema);
