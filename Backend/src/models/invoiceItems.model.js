import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
  {
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
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
    },

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const invoiceItem =  mongoose.model("InvoiceItem", invoiceItemSchema);