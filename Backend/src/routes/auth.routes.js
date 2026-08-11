import { Router } from "express";
import { registerUser,loginUser,logoutUser } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { registerUserValidation,loginUserValidation } from "../validations/auth.validation.js";
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

// Secure routes
router.route("/logout").get(
    verifyJWT(),
    logoutUser
)


export default router;