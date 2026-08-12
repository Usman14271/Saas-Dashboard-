import { user } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { apiError } from "../uttils/apiError.js";
import asyncHandler from "../uttils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req?.cookies?.accessToken || req.header("authorization")?.replace("Bearer ","");

        if(!token){
            throw new apiError(401,"No access Token");
        }
    
        const decodedUser = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const authUser = await user.findById(decodedUser._id).select("-password -refreshToken");
    
        if(!authUser){
            throw new apiError(401,"Unauthorized access");
        }
    
        req.user = authUser;
    
        next();
    } 
    catch (error) {
        if (error.name === "TokenExpiredError") {
      throw new apiError(
        401,
        "Access token expired"
      );
    }

    if (error.name === "JsonWebTokenError") {
      throw new apiError(
        401,
        "Invalid access token"
      );
    }
    }
})

export default verifyJWT;