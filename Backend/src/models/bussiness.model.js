import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
    {
        businessName:{
            type: String,
            required: true,
            trim: true
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        businessType:{
            type: String,
            enum:[
                "Wholesaler",
                "Retailer",
                "Manufacturer",
                "Distributor",
                "Service Provider",
                "E-commerce",
                "Other",
            ],
            required: true
        },
        industry: {
            type: String,
            enum: [
                "Garments",
                "Electronics",
                "Pharmacy",
                "Grocery",
                "Furniture",
                "Construction",
                "Automobile",
                "Textile",
                "Other",
            ],
            default: "Garments",
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
        logo:{
            type: String,
            required: true,
        },
        taxNumber:{
            type: String,
            required: true,
            default: ""
        },
        businessRegistrationID:{
            type: String,
            required: true,
            default: ""
        },
        currency:{
            type: String,
            required: true,
            trim: true,
            default:"PKR"
        },
        status:{
            type: Boolean,
            required: true
        }
    },
    {
        timestamps:true
    }
)

export const business = mongoose.model("Business",businessSchema);