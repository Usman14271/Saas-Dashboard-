import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        businessId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true
        },
        productVarient:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductVarient",
            required: true
        },
        productName:{
            type: String,
            required: true,
            trim: true,
        },
        brandName:{
            type: String,
            required: true,
            trim: true,
            default: true,
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        description:{
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
        supplierId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true,
        },
    },
    {timestamps:true}
);

export const product = mongoose.model("Product",productSchema);