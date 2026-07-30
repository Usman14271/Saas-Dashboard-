import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
    {
        businessId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true
        },
        supplierId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true,
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
        purchaseNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        supplierInvoiceNumber: {
            type: String,
            default: "",
            trim: true,
        },
        purchaseDate: {
            type: Date,
            required: true,
            default: Date.now,
        },  
        expectedDeliveryDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: [
                "Pending",
                "Ordered",
                "Received",
                "Partially Received",
                "Cancelled",
            ],
            default: "Received",
        },
        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },
        discount: {
            type: Number,
            default: 0,
            min: 0,
        },
        tax: {
            type: Number,
            default: 0,
            min: 0,
        },
        shippingCharges: {
            type: Number,
            default: 0,
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },  
        amountPaid: {
            type: Number,
            default: 0,
            min: 0,
        },
        amountDue: {
            type: Number,
            default: 0,
            min: 0,
        },
        paymentStatus: {
            type: String,
            enum: [
                "Unpaid",
                "Partial",
                "Paid",
        ],
            default: "Unpaid",
        },
        paymentMethod: {
            type: String,
            enum: [
                "Cash",
                "Bank Transfer",
                "Cheque",
                "Credit Card",
                "Other",
            ],
        },
        notes: {
            type: String,
            default: "",
            trim: true,
        },                      
    },
    {timestamps:true}
);

export const purchase = mongoose.model("Purchase",purchaseSchema);