const { config } = require('dotenv');
config();

module.exports = {
    PORT: process.env.PORT || 4000,
    MONGO_PASS: process.env.MONGO_PASS,
    MONGO_USERNAME: process.env.MONGO_USERNAME
}