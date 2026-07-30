import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
    {
        businessId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true
        },
        supplierName:{
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
        supplierType: {
             type: String,
             enum: [
                "Manufacturer",
                "Wholesaler",
                "Distributor",
                "Importer",
                "Local Supplier",
                "Other",
            ],
            default: "Wholesale",
         },
        paymentTerms:{
            type: String,
            enum:[
                "Cash",
                "7 Days",
                "15 Days",
                "30 Days",
                "45 Days",
                "60 Days",
            ],
            default: "Cash",
            required: true,
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
        status:{
            type: Boolean,
            default: true,
        },
        images:{
            type: String,
        },
        notes:{
            type: string,
            trim: true,
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

export const supplier = mongoose.model("Supplier",supplierSchema);