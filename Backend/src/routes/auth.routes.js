import { Router } from "express";
import { registerUser,loginUser,logoutUser, refreshToken, getCurrentUser, changePassword } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { registerUserValidation,loginUserValidation, changePasswordValidation } from "../validations/auth.validation.js";
import { upload } from "../middlewares/multer.middlewares.js";
import verifyJWT from "../middlewares/verifyJWT.midleware.js";

const router = Router();

router.route("/register").post(
    upload.single("profilePicture"),
    validate(registerUserValidation),
    registerUser);

router.route("/login").post(
    validate(loginUserValidation),
    loginUser
);

router.route("/refresh-token").post(
    refreshToken
)

// Secure routes
router.route("/logout").get(
    verifyJWT,
    logoutUser
)

router.route("/me").get(
    verifyJWT,
    getCurrentUser
)

router.route("/change-password").patch(
    verifyJWT,
    // validate(changePasswordValidation),
    changePassword
)


export default router;