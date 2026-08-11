import { user } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { apiError } from "../uttils/apiError.js";
import asyncHandler from "../uttils/asyncHandler.js";

const verifyJWT = asyncHandler((req, res, next) => {
    try {
        const authorizer = req?.cookies?.accessToken || req.header("authorization")?.replace("Bearer","");
    
        const decodedUser = jwt.verify(authorizer,process.env.ACCESS_TOKEN_SECRET);
    
        const authUser = await user.findById(decodedUser._id).select("-password, -refreshToken");
    
        if(!authUser){
            throw new apiError(201,"Unauthorized access");
        }
    
        req.user = authUser;
    
        next();
    } catch (error) {
        throw new apiError(201,"Unauthorized access",error);
    }
})

export default verifyJWT;