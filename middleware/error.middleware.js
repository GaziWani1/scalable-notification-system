import { NODE_ENV } from "../config/env.js";

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 
  
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      message,
      stack: NODE_ENV === "development" ? err.stack : undefined,
    });
  };
  
  export default errorHandler;
  