const mongoose = require("mongoose");
const env = require("../helpers/env");

// Connect to MongoDB database
const connect = async () => {
  try {
    await mongoose.connect(`${env.db.url}:${env.db.port}/${env.db.name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected!");
  } catch (e) {
    console.error(e);
  }
};

return connect();
