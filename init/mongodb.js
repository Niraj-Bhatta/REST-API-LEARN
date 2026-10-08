const mongoose = require("mongoose");

const { connectionUrl } = require("../config/keys");

const connectMongodb = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log("the connection of database is successful");

    console.log("READY STATE:", mongoose.connection.readyState);
    console.log("HOST:", mongoose.connection.host);
    console.log("DATABASE:", mongoose.connection.name);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { connectMongodb };
