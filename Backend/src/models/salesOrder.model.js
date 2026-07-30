import mongoose from "mongoose";

const salesOrderSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },

    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    orderDate: {
      type: Date,
      default: Date.now,
      required: true,
    },

    expectedDeliveryDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Partially Delivered",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
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
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);



export const salesOrder = mongoose.model("SalesOrder", salesOrderSchema);;