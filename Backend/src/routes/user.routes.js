import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import { registerUserValidation } from "../validations/user.validation.js";

const router = Router();

router.route("/register").post(validate(registerUserValidation), registerUser);


export default router;