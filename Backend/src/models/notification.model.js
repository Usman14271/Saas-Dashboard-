import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "Inventory",
        "Sales",
        "Purchase",
        "Invoice",
        "Payment",
        "Expense",
        "Customer",
        "Supplier",
        "User",
        "System",
      ],
      default: "System",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    referenceType: {
      type: String,
      enum: [
        "Product",
        "Purchase",
        "SalesOrder",
        "Invoice",
        "CustomerPayment",
        "SupplierPayment",
        "Expense",
        "Customer",
        "Supplier",
        "User",
      ],
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    actionUrl: {
      type: String,
      default: "",
    },

    expiresAt: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);



export const notification = mongoose.model(
  "Notification",
  notificationSchema
);;