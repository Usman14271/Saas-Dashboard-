import mongoose from "mongoose";

const productVarientSchema = new mongoose.Schema(
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
        sku:{
            type: String,
            unique: true,
            trim: true,
            required: true,
            uppercase: true,
        },
        color:{
            type: String,
            trim: true,
            required: true
        },
        size:{
            type: String,
            enum:[
                "XS",
                "S",
                "M",
                "L",
                "XL",
                "XXl",
                "Free",
            ],
            default: "Free",
            required: true,
        },
        purcahsePrice:{
            type: Number,
            required: true,
            trim: true,
            min: 0,
        },
        salePrice:{
            type: Number,
            required: true,
            trim: true,
            min: 0,
        },
        stock:{
            type: Number,
            required: true,
            trim: true,
            min: 0,
            default: 0,
        },
        minimumStock:{
            type: Number,
            required: true,
            trim: true,
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
    {timestamp:true}
);

export const productVarient = mongoose.model("ProductVarient",productVarientSchema)