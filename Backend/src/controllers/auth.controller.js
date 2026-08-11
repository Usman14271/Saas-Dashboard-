import { userService } from "../services/user.service.js";
import asyncHandler from "../uttils/asyncHandler.js";

const registerUser = asyncHandler(async (req,res) => {

    const userData = await userService(req.body, req.file);
    console.log(userData)
    res.status(200).json({
        success: true,
        data: userData
    })
})

export {registerUser};