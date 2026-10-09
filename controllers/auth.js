const mongoose = require("mongoose");
const User = require("../models");

const signup = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER MODEL:", User);
    console.log("DATABASE:", mongoose.connection.name);
    console.log("COLLECTION:", User.collection.name);

    const { name, email, password, role } = req.body;

    if (!name) {
      res.code=400;
      throw new Error("You Must Input name");
    }

    if (!email) {
      res.code=400;
      throw new Error("You Must Input email");
    }
    if (!password) {
      res.code=400;
      throw new Error("You Must Input password");
    }
    if(password.length < 5){
      res.code =400;
      throw new error("password must be greater than 6 characters")
    }

    if (!role) {
      res.code=400;
      throw new Error("You Must Input role");
    }

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
      collections.map((c) => c.name),
    );

    res.status(201).json({
      code: 201,
      status: true,
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    next(error);
  }
};

module.exports = { signup };
