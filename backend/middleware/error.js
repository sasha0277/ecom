const ErrorHandler = require('../utils/errorhandler')


module.exports = (err,req,res,next) => {

    err.statusCode = err.statusCode || 800;
    err.message = err.message ||"internal server error";

    //WRONG MONGODB ID ERROR
    if(err.name==="CastError"){
        const message = `resource not found.Invaild: ${err.path}`;
        err= new ErrorHandler(message,400);
    }

    // MONGO DULICATE KEY ERROR 
    if(err.code===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err= new ErrorHandler(message,400);
    }

     // wrong JWT ERROR
     if(err.name==="JsonWebTokenError"){
        const message = `Json Web Token is invalid, try again`;
        err= new ErrorHandler(message,400);
    }
     // JWT Expire ERROR
     if(err.name==="TokenExpireError"){
        const message = `Json Web Token is Expire, try again`;
        err= new ErrorHandler(message,400);
    }




    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}