const {signup, signin} =require("./auth");
const {notFound} =require("./notFound");

const authController = {
    signup ,signin
};

module.exports={authController,notFound};