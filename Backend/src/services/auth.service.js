import fs from "fs/promises";
import { user } from "../models/user.model.js";
import uploadCloudinary from "../uttils/cloudinary.js";
import { apiError } from "../uttils/apiError.js";
import jwt from "jsonwebtoken";

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
        const accessToken = requiredUser.generateAccessToken();
        const refreshToken = requiredUser.generateRefreshToken();
      
        requiredUser.refreshToken = refreshToken;



        await requiredUser.save({
           validateBeforeSave: false
        });

        return {
           accessToken,
           refreshToken
        };
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

    const isMatch = await searchedUser.isPasswordCorrect(password);

    if(!isMatch){
        throw new apiError(
            401,
            "Invalid credentials"
        )
    }

    const {accessToken,refreshToken} = await generateTokens(searchedUser._id);

    return {accessToken,refreshToken};

}

const logoutService = async (_id) =>{
  await user.findByIdAndUpdate(
        _id, 
        { refreshToken: "" }
    );
}

const refreshTokenService = async(incomingToken) =>{
    if(!incomingToken){
      throw new apiError(401, "Unauthorized Access")
    }

    const decodedToken = jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET);

    const findUser = await user.findById(decodedToken._id);

    if(!findUser){
      throw new apiError(401, "Unauthorized Access")
    }

    if(findUser.refreshToken != incomingToken){
      throw new apiError(401, "Unauthorized Access") 
    }

    const {accessToken, refreshToken } = await generateTokens(findUser._id);

    return {accessToken,refreshToken};
}

const currentUserService = async (_id)=>{
  const data = await user.findById(_id).select("-password -refreshToken")

  if(!data){
    throw new apiError(400, "User data cannot exist");
  }

  return data;
}

const changePasswordService = async(_id,newPassword,currentPassword)=>{

  const currentUser = await user.findById(_id);

  const passwordCorrect = await currentUser.isPasswordCorrect(currentPassword);

  if(!passwordCorrect){
    throw new apiError(402,"Password cannot match from previous password")
  }

  const passwordSame = await currentUser.isPasswordSame(newPassword);

  if(passwordSame){
    throw new apiError(402,"Password must be different from previous password")
  }

  currentUser.password = newPassword;
  currentUser.save();
  
  const {accessToken,refreshToken} = await generateTokens(_id)  
  return {accessToken,refreshToken};

}

export {registerService,loginService, refreshTokenService, logoutService, currentUserService, changePasswordService}