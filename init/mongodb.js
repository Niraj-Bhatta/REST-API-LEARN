const mongoose = require("mongoose");

const { connectionUrl } = require("../config/keys");

const connectMongodb = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log("the connection of database is successful")
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { connectMongodb };
