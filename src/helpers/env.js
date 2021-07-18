// Dot ENV
require("dotenv").config();
module.exports = {
  db: {
    url: process.env.MONGODB_URL,
    port: process.env.MONGODB_PORT,
    name: process.env.MONGODB_DBNAME,
  },
  app: {
    name: process.env.APP_NAME,
    port: process.env.APP_PORT,
    url: process.env.APP_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
