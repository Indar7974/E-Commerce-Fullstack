const productModel = require("../models/productModel")
const {isValid, isValidName, isValidPrice, isValidDescription, isValidRating} = require("./Validator")

const mongoose = require("mongoose")

// Add Product

const addProduct = async (req, res) => {
    try {
       const productData = req.body;

       if(Object.keys(productData).length === 0) {
            return res.status(400).json ({msg: "Bad Request, No Data Provided"});
        }

        const {productImage, productName, productCategory, productPrice, productDescription, productFreeDelivery, productRating} = productData

        // Product Image Validation

        if(!isValid(productImage)){
            return res.status(400).json({msg:"Product Image is Required"})
        }

        // Product Name Validation

        if(!isValid(productName)){
            return res.status(400).json({msg:"Product Name is Required"})
        }

        if(!isValidName(productName)){
            return res.status(400).json({msg:"InValid Product Name"})
        }

        let duplicateproductName = await productModel.findOne({ productName });
        if (duplicateproductName) {
            return res.status(400).json({ msg: "Product Name Already Exists" });
        }
    
        // Product Category Validation

        if(!isValid(productCategory)){
            return res.status(400).json({msg:"Product Category is Required"})
        }

        let validCategory = ["Electronics","Clothing", "Food", "Books","Furniture"]
        if(!validCategory.includes(productCategory.trim())){
            return res.status(400).json({msg:"Product must be 'Electronics','Clothing', 'Food', 'Books',Furniture"})
        }

        // Product Price Validation

        if(!isValid(productPrice)){
            return res.status(400).json({msg:"Product Price is Required"})
        }

        if(!isValidPrice(productPrice)){
            return res.status(400).json({msg:"InValid Product Price"})
        }

        // Product Description Validation

        if(!isValid(productDescription)){
            return res.status(400).json({msg:"Product Description is Required"})
        }

        if(!isValidDescription(productDescription)){
            return res.status(400).json({msg:"InValid Product Description"})
        }

        // Product Freedelivery Validation

        if(!isValid(productFreeDelivery)){
            return res.status(400).json({msg:"Product FreeDeliyeru is required or not"})
        }

        // Product Rating Validation

        if(!isValid(productRating)){
            return res.status(400).json({msg:"Product Rating is Required"})
        }

        if(!isValidRating(productRating)){
            return res.status(400).json({msg:"InValid Product Fating"})
        }

        let Product = await productModel.create(productData);
        return res.status(201).json({msg:"Product Data Added Successfully", Product})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Internal Server Error" });
    }
}

// Get All Product


const getProduct = async(req, res)=> {
    try {
       let productData = await productModel.find();
       return res.status(200).json({productData})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Internal Server Error" });
    }
}


// Update Product

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;

        if(!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({msg:"Invalid User Id"})
        }

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ msg: "Bad Request No update data provided" });
        }

        const {productName, productImage, productCategory, productPrice, productDescription, productRating} = data

        // Validation of Name

        if (productName !== undefined) {
            if (!isValid(productName)) {
                return res.status(400).json({ msg: "Product Name is Required" });
            }
            if (!isValidName(productName)) {
                return res.status(400).json({ msg: "Invalid Product Name" });
            }
            let duplicateproductName = await productModel.findOne({ productName });
            if (duplicateproductName) {
                return res.status(400).json({ msg: "Product Name Already Exists" });
            }
        }

        // Validation of Image

        if (productImage !== undefined) {
            if(!isValid(productImage)){
                return res.status(400).json({msg:"Product Image Is Required"})
            }
        }

        // Validation of product Category

        if(productCategory !== undefined) {
            if(!isValid(productCategory)){
                return res.status(400).json({msg:"Product Category Is Required"})
            }
            let validCategory = ["Electronics","Clothing", "Food", "Books","Furniture"]
            if(!validCategory.includes(productCategory.trim())){
                return res.status(400).json({msg:"Product must be 'Electronics','Clothing', 'Food', 'Books',Furniture"})
            }
        }

        // Validation of Price

        if (productPrice !== undefined) {
            if (!isValid(productPrice)) {
                return res.status(400).json({ msg: "Product Price is Required" });
            }
            if (!isValidPrice(productPrice)) {
                return res.status(400).json({ msg: "Invalid Product Price" });
            }
        }


        // Validation of Description

        if (productDescription !== undefined) {
            if (!isValid(productDescription)) {
                return res.status(400).json({ msg: "Product Description is Required" });
            }
            if (!isValidDescription(productDescription)) {
                return res.status(400).json({ msg: "Invalid Product Description" });
            }
        }


        // Validation of Rating

        if (productRating !== undefined) {
            if (!isValid(productRating)) {
                return res.status(400).json({ msg: "Product Rating is Required" });
            }
            if (!isValidRating(productRating)) {
                return res.status(400).json({ msg: "Invalid Product Rating" });
            }
        }

        const updateProduct = await productModel.findByIdAndUpdate(productId, data, {new : true})

        if(!updateProduct){
            return res.status(404).json({msg:"Product Not Found"})
        }

        return res.status(200).json({msg:"Product Data Update Successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Internal Server Error" });
    }
}

// Delete Product Data

const deleteProduct = async(req, res) => {
    try {
        
        let productId = req.params.id;
        let deleteProduct = await productModel.findByIdAndDelete(productId);
        if(!deleteProduct){
            return res.status(404).json({msg:"Product not Found"})
        }
        return res.status(200).json({msg:"Product Data Delete Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}


// Get Product By Id

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        return res.status(200).json({ product });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

// getProductByQuery



module.exports = {addProduct, getProduct, updateProduct, deleteProduct, getProductById}