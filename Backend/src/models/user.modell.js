import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        businessId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true
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
            type: String,
            enum: [
                "owner",
                "admin",
                "manager",
                "sales",
                "accountant",
                "inventory",
                "customer"
            ],
            trim: true,
            default: "admin",
        },
        password:{
            type: String,
            required: true,
            minlength: 8,
        },
        isEmailVerified:{
            type: Boolean,
            default: false,
            required: true,
        },
        addedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isActive:{
            type: Boolean,
            default: true,
        },
        lastLogin:{
            type: Date,
        },
        refreshToken:{
            type: String,
            default: "",
        }
    },
    {timestamps: true}
);

userSchema.pre('save', async function(next){
    if(!this.modified("password")) return next();
    this.password = bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
}

export const user = mongoose.model("User",userSchema);