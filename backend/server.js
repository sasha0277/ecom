const app = require("./app");


const connectDatabase = require("./config/database")

const cloudinary = require("cloudinary");


// handling uncaught exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down due to uncaught exception`);
    process.exit(1);
})



//config
if(process.env.NODE_ENV!=="PRODUCTION"){

    require("dotenv").config({ path: "backend/config/config.env" });

}



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//connecting to database

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})


// UNHANDLED PROMISE REJECTIONS
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("shutting down server with unhandledRejection");

    server.close(()=>{
        process.exit(1);
    })
})