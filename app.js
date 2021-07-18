// Express
const express = require("express");
const app = express();

// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DOTEnv
const env = require("./src/helpers/env");

// CORS
const cors = require("cors");
app.use(cors());

// DB config
require("./src/configs/db");

// Router
const users = require("./src/routers/users");
const posts = require("./src/routers/posts");
app.use(users);
app.use(posts);

app.use("/profile/image", express.static("storages/profile"));
app.use("/post/image", express.static("storages/post"));

app.listen(env.app.port, () => {
  console.log(`${env.app.name} running at ${env.app.url}:${env.app.port}`);
});
