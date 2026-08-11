import fs from "fs/promises";
import { user } from "../models/user.model.js";
import uploadCloudinary from "../uttils/cloudinary.js";
import { apiError } from "../uttils/apiError.js";

const registerService = async (body, file) => {

  try {

    const existingUser = await user.findOne({
      $or: [
        { username: body.username },
        { email: body.email }
      ]
    });

    if (existingUser) {
      throw new apiError(
        409,
        "Username or email already exists"
      );
    }

    // Upload to Cloudinary
    const profileURL = await uploadCloudinary(
      file.path,
      body.username
    );

    // Create user
    const newUser = await user.create({
      ...body,
      profilePicture: profileURL.secure_url
    });

    return newUser;

  } finally {

    // Always remove local temporary file
    if (file?.path) {
      try {
        await fs.unlink(file.path);
      } catch (error) {
        console.error(
          "Temporary file cleanup failed:",
          error.message
        );
      }
    }
  }
};

const generateTokens = async(_id)=>{

    try{
        const requiredUser = await user.findById(_id);
        const accessToken =  requiredUser.accessToken();
        const refreshToken =  requiredUser.refreshToken();

        requiredUser.refreshToken = refreshToken;

        await requiredUser.save(validateBeforeSave=false);

        return {accessToken,refreshToken};
    }
    catch(err){
        throw new apiError(
            500,
            "Token generation failed"
        )
    }
}

const loginService = async (email, password) => {
    const searchedUser = await user.findOne({email});

    if(!searchedUser){
        throw new apiError(
            404,
            "User not found"
        )
    }

    const isMatch = await searchedUser.ispassword(password);

    if(!isMatch){
        throw new apiError(
            401,
            "Invalid credentials"
        )
    }

    const {accessToken,refreshToken} = await generateTokens(searchedUser._id);

    return {accessToken,refreshToken};

}


export {registerService,loginService}