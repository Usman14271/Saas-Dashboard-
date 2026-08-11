import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        module: {
            type: String,
            required: true,
            trim: true,
        },
        actions: {
            type: String,
            required: true,
            enum: ["create", "read", "update", "delete"],
        },
    },
    { timestamps: true }
);

const permission = mongoose.model("Permission", permissionSchema);