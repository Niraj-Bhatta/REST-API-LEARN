const express =require("express");
const bodyParser = require("body-parser");
const dotenv =require("dotenv");
const morgan =require("morgan");
dotenv.config();
const {connectMongodb} =require("./init/mongodb");
const {authRoute} =require("./routes");
const {errorHandler} =require("./middleware");
const {notFound} = require("./controllers");

//init app
const app = express();

//connect database

connectMongodb();

//third party middleware
app.use(express.json({limit: "500mb"}));
app.use(bodyParser.urlencoded({limit : "500mb",extended :true}));
app.use(morgan("dev"));



//route selection
app.use("/api/v1/auth",authRoute);
app.use(express.json());

app.use(errorHandler);

//not found route
app.use(notFound);


module.exports =app;
