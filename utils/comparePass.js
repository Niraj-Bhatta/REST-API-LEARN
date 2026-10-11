const bcrypt = require("bcryptjs");

const comparePassword =(password,hashedPassword)=>{
   return bcrypt.compare(password,hashedPassword);//b00lean
}

module.exports = {comparePassword};