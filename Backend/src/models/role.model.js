import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type: String,
        },
        businessId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
        },
        permissions:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission",
        }]
    }, 
    { timestamps: true }
);

const role = mongoose.model('Role', roleSchema);