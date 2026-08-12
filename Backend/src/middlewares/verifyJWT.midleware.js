import { user } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { apiError } from "../uttils/apiError.js";
import asyncHandler from "../uttils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    // try {
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
    // } catch (error) {
    //     throw new apiError(401,"Unauthorized access",error);
    //}
})

export default verifyJWT;