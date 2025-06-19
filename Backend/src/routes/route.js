const express = require("express");
const Route = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

// User Route
const { addUser, getUser,updateUser, deleteUser, getUserByGender, loginUser} = require("../controller/userController");

Route.post("/addUser", addUser);
Route.get("/getUser",authMiddleware, getUser);
Route.put("/updateUser/:id",authMiddleware, updateUser);
Route.delete("/deleteUser/:id",authMiddleware, deleteUser);
Route.get("/getUserByGender",getUserByGender);
Route.post("/login", loginUser);

// Product Route

const {addProduct, getProduct, updateProduct, deleteProduct, getProductById} = require("../controller/productController");

Route.post("/addProduct", addProduct);
Route.get("/getProduct", getProduct);
Route.put("/updateProduct/:id", updateProduct);
Route.delete("/deleteProduct/:id", deleteProduct);
Route.get("/getProductById/:id", getProductById);

module.exports = Route;
