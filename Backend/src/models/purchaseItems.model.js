import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema(
  {
    purchase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase",
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
    purchasePrice: {
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



export const purchaseItem = mongoose.model(
  "PurchaseItem",
  purchaseItemSchema
);;