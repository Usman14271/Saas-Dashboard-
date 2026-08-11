import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { registerUserValidation } from "../validations/user.validation.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/register").post(
    upload.single("profilePicture"),
    validate(registerUserValidation),
    registerUser);


export default router;