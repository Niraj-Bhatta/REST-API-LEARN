const mongoose = require("mongoose");
const User = require("../models");

const signup = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER MODEL:", User);
    console.log("DATABASE:", mongoose.connection.name);
    console.log("COLLECTION:", User.collection.name);

    const { name, email, password, role } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    console.log("NEW USER:", newUser);

    const savedUser = await newUser.save();

    console.log("SAVED USER:", savedUser);

    const dbName = mongoose.connection.db.databaseName;
const collections = await mongoose.connection.db
  .listCollections()
  .toArray();

console.log("ACTUAL DB:", dbName);
console.log(
  "COLLECTIONS:",
  collections.map((c) => c.name)
);

    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    next(error);
  }
};

module.exports = { signup };