import mongoose from "mongoose";
import { user } from "../models/user.model.js"
import { apiError } from "../uttils/apiError.js";
import uploadCloudinary from "../uttils/cloudinary.js";


export const userService = async (body,file)=>{

    const existingUser = await user.findOne({
        $or: 
        [{username: body.username}, {email: body.email}]
    });

    if(existingUser){
        throw new apiError(400, "User already exists");
    }

    const profileLocalPath = file?.path;

    if(!profileLocalPath) {
        throw new apiError(400, "picture is required");
    }

    const profileURL = await uploadCloudinary(profileLocalPath, body.username);

    if(!profileURL) {
        throw new apiError(500, "Failed to upload profile picture");
    }

    const newUser = new user({
        username: body.username,
        email: body.email,
        password: body.password,
        fullName: body.fullName,
        phone: body.phone,
        address: body.address,
        profilePicture: profileURL.secure_url,
        role: body.role
    });
    const saveUser = await newUser.save();
    return user
    .finduserbyId(saveUser._id)
.select("-password -refreshToken -_id");
}