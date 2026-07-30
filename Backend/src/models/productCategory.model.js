import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema(
    {
     businessId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true
        },
        productID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        categoryName:{
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type: String,
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

export const productCategory = mongoose.model("ProductCategory",productCategorySchema);