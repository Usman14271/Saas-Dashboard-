import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        businessId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true
        },
        customerName:{
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        companyName:{
            type: String,
            required: true,
            trim: true,
        },
        phone:{
            type: String,
            required: true,
            trim: true
        },
        alternatePhone:{
            type: String,
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
        customerType: {
             type: String,
             enum: [
                "Retail",
                "Wholesale",
                "Distributor",
                "Online",
            ],
            default: "Wholesale",
         },
        profilePicture:{
            type: String,
            required: true,
        },
        openingBalance:{
            type: Number,
            default: 0,
        },
        currentBalance:{
            type: Number,
            default: 0,
        },
        creditLimit:{
            type: Number,
            default: 0,
            min: 0,
        },
        status:{
            type: Boolean,
            default: true,
        },
        images:{
            type: String,
        },
        addedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        updatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {timestamps:true}
);

export const customer = mongoose.model("Customer",customerSchema);