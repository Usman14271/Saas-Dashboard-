import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    expenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Rent",
        "Utilities",
        "Salary",
        "Transportation",
        "Office Supplies",
        "Marketing",
        "Internet",
        "Telephone",
        "Maintenance",
        "Fuel",
        "Travel",
        "Tax",
        "Insurance",
        "Miscellaneous",
      ],
      required: true,
    },

    expenseDate: {
      type: Date,
      default: Date.now,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
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
        "Other",
      ],
      required: true,
    },

    paidTo: {
      type: String,
      required: true,
      trim: true,
    },

    referenceNumber: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    attachment: {
      type: String, // Receipt or invoice URL
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled"],
      default: "Paid",
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



export const expense = mongoose.model("Expense", expenseSchema);