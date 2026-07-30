import mongoose from "mongoose";

const receivablePaymentSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
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

    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const receivablePayment =  mongoose.model(
  "ReceivablePayment",
  receivablePaymentSchema
);