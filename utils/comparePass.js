const bcrypt = require("bcryptjs");

const comparePassword =(password,hashedPassword)=>{
   return bcrypt.compare(password,hashedPassword);//bpplean
}

module.exports = {comparePassword};