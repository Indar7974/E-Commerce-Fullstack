const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true, // URL or image path
        trim: true,
    },
    productName: {
        type: String,
        required: true,
        unique:true,
        trim: true,
    },
    productCategory: {
        type: String,
        enum: ["Electronics","Clothing", "Food", "Books","Furniture"],
        required : true,
        trim : true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
        trim: true,
    },
    productfreeDelivery: {
        type: Boolean,
        default: true,
    },
    productRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
}, { timestamps: true });

module.exports = new mongoose.model("Product", productSchema);
