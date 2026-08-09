import mongoose from "mongoose";
import { user } from "../models/user.model.js"


export const userService = async (body)=>{
    const newUser = new user(body);
    const saveUser = await newUser.save();
    return saveUser;
}