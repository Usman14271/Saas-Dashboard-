import mongoose from "mongoose";

const payablePaymentSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    purchase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase",
    },

    paymentNumber: {
      type: String,
      required: true,
      unique: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "Bank Transfer",
        "Cheque",
        "Credit Card",
        "JazzCash",
        "EasyPaisa",
        "Other"
      ],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    referenceNumber: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const payablePayment =  mongoose.model(
  "PayablePayment",
  payablePaymentSchema
);