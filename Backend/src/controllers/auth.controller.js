import { registerService, loginService } from "../services/auth.service.js";
import asyncHandler from "../uttils/asyncHandler.js";
import { apiResponse } from "../uttils/apiResponse.js";

const registerUser = asyncHandler(async (req,res) => {

    const userData = await registerService(req.body, req.file);
    
    return res
    .status(201)
    .json(
        new apiResponse(201, userData, "User registered successfully")
    )
})

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    const {accessToken,refreshToken} = await loginService(email, password);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
        new apiResponse(200, { accessToken, refreshToken }, "User logged in successfully")
    )

})

const logoutUser = asyncHandler(async (req,res) => { 
    await user.findByIdAndUpdate(
        req.user._id, 
        { refreshToken: "" }
    );

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("refreshToken","",options)
    .cookie("accessToken","",options)
    .json(
        new apiResponse(200, null, "User logged out successfully")
    )   
  })

export {registerUser, loginUser,logoutUser};