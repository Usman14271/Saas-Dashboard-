import mongoose from "mongoose";

const inventoryTransactionSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    productVariant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
      index: true,
    },

    transactionType: {
      type: String,
      enum: [
        "Purchase",
        "Sale",
        "Purchase Return",
        "Sales Return",
        "Stock Adjustment",
        "Stock Transfer",
        "Opening Stock",
      ],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    stockEffect: {
      type: String,
      enum: ["IN", "OUT"],
      required: true,
    },

    unitCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    purchase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase",
    },

    salesOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrder",
    },

    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },

    referenceNumber: {
      type: String,
      default: "",
      trim: true,
    },

    transactionDate: {
      type: Date,
      default: Date.now,
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);



export const inventoryTransaction = mongoose.model(
  "InventoryTransaction",
  inventoryTransactionSchema
);