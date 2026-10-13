const mongoose = require("mongoose");
const User = require("../models");
const hashPassword = require("../utils/hashPass");
const { comparePassword } = require("../utils/comparePass");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");

const signup = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER MODEL:", User);
    console.log("DATABASE:", mongoose.connection.name);
    console.log("COLLECTION:", User.collection.name);

    const { name, email, password, role } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      res.code = 400;
      throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
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

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.code = 401;
      throw new Error("Invalid CRedentials");
    }

    const token = generateToken(user);

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "User signin successful",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const verifyCode = async (req, res, next) => {
  try {
    {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.code = 404;
        throw new Error("User not Found");
      }
      if (user.isVerified) {
        res.code = 400;
        throw new Error("User already verified");
      }

      const code = generateCode();
      user.verificationCode = code;
      await user.save();

      await sendEmail({
        emailTo: req.body.email,
        subject: "Email verification code",
        code,
        content: "verify your account",
      });
    }
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Verification code sent successfully",
    });
  } catch (error) {
    next(error);
  }
};
const verifyUser =async(req,res,next)=>{
  try{
    const {email , code} =req.body;

    const user = await User.findOne({email});

    if(!user){
      res.code =404;
      throw new Error("User not found");
    }

    if(user.verificationCode!== code){
      res.code =400;
      throw new Error("Invalid code");
    }
user.isVerified=true;
user.verificationCode = null;

await user.save();

res.status(200).json({code : 200 , status : true , message :"user verified successfully"});



  }catch(error){
    next(error);
  }
}


const forgotPasswordCode =async (req,res,next)=>{
  try{
    const {email} =req.body;

    const user = await User.findOne({email});

    if(!user){
      res.code =404;
      throw new Error("User not found");


    
    }
const code = generateCode();

user.forgotPasswordCode = code;
await user.save();

await sendEmail({
  emailTo : user.email,
  subject:"Forget Password Code",
  code,
  content : "change your password"

});
res.status(200).json({code : 200 ,status : true , message :"Forget password code sent successfully"});

  }catch(error){
    next(error);
  }
}

const recoverPassword =async(req,res,next)=>{
  try{

    const {email,code,password} =req.body;

    const user =await User.findOne({email});

    if(!user){
      res.code =400;
      throw new Error("User not Found");
    }

    if(user.forgotPasswordCode !=code){
      res.code =400;
      throw new Error("Invalid Code");
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.forgotPasswordCode = null;
    await user.save();

    res.status(200).json({code : 200, status : true , message : "Password recovered successfully"})

  }catch(error){
    next(error);
  }
}


const changePassword =async(req,res,next)=>{
  try{



  }catch(error){
    next(error);
  }
}
module.exports = { signup, signin, verifyCode ,verifyUser,forgotPasswordCode, recoverPassword, changePassword};
