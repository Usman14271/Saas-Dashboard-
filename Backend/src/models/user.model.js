import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        businessId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
        },
        fullName:{
            type: String,
            required: true,
            trim: true,
        },
        username:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
       phone:{
                type: String,
                required: true,
                trim: true
            },
        address: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: {
                type: String,
                default: "Pakistan",
            },
        },
        profilePicture:{
            type: String,
            required: true,
        },
        role:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        password:{
            type: String,
            required: true,
            minlength: 8,
        },
        refreshToken:{
            type: String,
            default: "",
        }
    },
    {timestamps: true}
);

userSchema.pre('save', async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.method.accessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            bussinessId: this.businessId,
            username: this.username,
            role: this.role,
            addedBy: this.addedBy,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.method.refreshToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            bussinessId: this.businessId,
            role: this.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const user = mongoose.model("User",userSchema);