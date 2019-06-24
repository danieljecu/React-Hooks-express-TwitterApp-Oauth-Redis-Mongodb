const redis = require("redis");
require("dotenv").config();
const connect = () => {
  return redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
  });
};

module.exports = connect;
