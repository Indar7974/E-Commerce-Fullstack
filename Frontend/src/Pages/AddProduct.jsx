import React, { useState } from "react";
import "./AddProduct.css";
import { ToastContainer, toast } from "react-toastify";

function AddProduct() {
  const [product, setProduct] = useState({
    image: "",
    name: "",
    category: "",
    price: "",
    description: "",
    freeDelivery: false,
    rating: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const error = {};
    const priceRegex = /^\d+(\.\d{1,2})?\s?(rupees|INR|dollars|USD)?$/i;
    const ratingRegex = /^(?:[0-4](?:\.[0-9])?|5(?:\.0)?)$/;
    const nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*( [A-Z][a-z]+)$/;
    const descriptionRegex = /^[a-zA-Z0-9\s.,!?()'"-]{10,1000}$/;

    // Image Validation
    if (!product.image){
      error.image = "Product image URL is required";
    } 

    // Name Validation
    if(!nameRegex.test(product.name.trim())){
      error.name = "Product name is required";
    } 

    // Category Validation
    if (!product.category.trim()){
      error.category = "Category is required";
    }

    // Price Validation
    if (!priceRegex.test(product.price)){
      error.price = "Enter a valid price";
    } 

    // Description Validation
    if (!descriptionRegex.test(!product.description.trim())){
      error.description = "Description is required";
    }
    
    // Rating Validation
    if (!ratingRegex.test(product.rating)){
      error.rating = "Rating must be between 0 and 5";
    } 

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Product Submitted:", product);

      toast.success("Product added successfully!");
      setProduct({
        image: "",
        name: "",
        category: "",
        price: "",
        description: "",
        freeDelivery: true,
        rating: "",
      });
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <ToastContainer position="top-center" autoClose={1000} />
      <h2 className="nm">Add New Product</h2>

      <input
        type="text"
        name="image"
        placeholder="Enter Product Image URL"
        value={product.image}
        onChange={handleChange}
      />
      {errors.image && <span className="error">{errors.image}</span>}

      <input
        type="text"
        name="name"
        placeholder="Enter Product Name"
        value={product.name}
        onChange={handleChange}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <input
        type="text"
        name="category"
        placeholder="Enter Product Category"
        value={product.category}
        onChange={handleChange}
      />
      {errors.category && <span className="error">{errors.category}</span>}

      <input
        type="text"
        name="price"
        placeholder="Enter Product Price"
        value={product.price}
        onChange={handleChange}
      />
      {errors.price && <span className="error">{errors.price}</span>}

      <textarea
        name="description"
        placeholder="Enter Product Description"
        value={product.description}
        onChange={handleChange}
      />
      {errors.description && <span className="error">{errors.description}</span>}

      <label htmlFor="Free"></label>
      <input
        type="text"
        name="freeDelivery"
        id="Free"
        placeholder="Enter Free Delivery"
        checked={product.freeDelivery}
        onChange={handleChange}
      />

      <input
        type="text"
        name="rating"
        placeholder="Product Rating (0-5)"
        value={product.rating}
        onChange={handleChange}
      />
      {errors.rating && <span className="error">{errors.rating}</span>}

      <button type="submit">Submit Product</button>
    </form>
  );
}

export default AddProduct;