const mongoose = require("mongoose");
const User = require("../models");
const hashPassword = require("../utils/hashPass");
const comparePass = require("../utils/comparePass")

const signup = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER MODEL:", User);
    console.log("DATABASE:", mongoose.connection.name);
    console.log("COLLECTION:", User.collection.name);

    const { name, email, password, role } = req.body;

    const isEmailExist =await User.findOne({email});
    if(isEmailExist){
      res.code = 400;
      throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password : hashedPassword,
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

const signin = async(req,res,next) =>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(!user){
      res.code = 401;
      throw new Error("Invalid credentials")
    }
 const match = await comparePassword(password,user.password);
 if(!match){
  res.code =401;
  throw new Error("INvalid CRedentials");
 }

 res.status(200).json({code : 200, status : OK , message :"User signin successful"})

  }catch(error){
    next(error);
  }
}
module.exports = { signup, signin };
