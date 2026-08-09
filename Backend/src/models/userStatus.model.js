import mongoose from "mongoose";

const userStatusSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
            required: true,
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: string,
            enum: ["active", "inactive", "suspended"],
            default: "inactive"
        },
        lastLogin: {
            type: Date,
            default: null,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const userStatus = mongoose.model("UserStatus", userStatusSchema);