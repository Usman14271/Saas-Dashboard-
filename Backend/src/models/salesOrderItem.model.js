import mongoose from "mongoose";

const salesOrderItemSchema = new mongoose.Schema(
  {
    salesOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrder",
      required: true,
      index: true,
    },

    productVariant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unitPrice: {
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

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);



export const salesOrderItem = mongoose.model(
  "SalesOrderItem",
  salesOrderItemSchema
);;