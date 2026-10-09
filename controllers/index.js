const {signup} =require("./auth");
const {notFound} =require("./notFound");

const authController = {
    signup
};

module.exports={authController,notFound};