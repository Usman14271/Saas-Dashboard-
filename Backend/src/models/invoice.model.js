import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    salesOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrder",
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    invoiceDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Draft",
        "Pending",
        "Partially Paid",
        "Paid",
        "Overdue",
        "Cancelled"
      ],
      default: "Pending",
    },

    subtotal: {
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

    shippingCharges: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    dueAmount: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

export const invoice =  mongoose.model("Invoice", invoiceSchema);