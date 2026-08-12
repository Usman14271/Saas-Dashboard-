import { registerService, loginService,refreshTokenService, logoutService, currentUserService, changePasswordService } from "../services/auth.service.js";
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

    await logoutService(req.user._id)

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

const refreshToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req?.cookies?.refreshToken || req?.body?.refreshToken;  

    const {
        accessToken,
        refreshToken 
        } = await refreshTokenService(incomingRefreshToken);

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(
            200,
            {accessToken,refreshToken},
            "Token refreshed successfully"
        )
    )
})

const getCurrentUser = asyncHandler(async(req,res)=>{
    const userData = await currentUserService(req.user._id);

    return res
    .status(200)
    .json(
        new apiResponse(200,userData,"")
    )

})

const changePassword = asyncHandler(async (req, res) => {
    
    const { accessToken, refreshToken } = await changePasswordService(
        req.user._id,
        req.body.newPassword,
        req.body.currentPassword
    );

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new apiResponse(
                200,
                { accessToken, refreshToken },
                "Password Changed successfully"
            )
        );
});

export {registerUser, loginUser,logoutUser, refreshToken,getCurrentUser, changePassword};