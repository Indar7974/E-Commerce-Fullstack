const userModel = require("../models/userModel");
const {
  isValid,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidContact,
  isValidAddress,
  isValidAge,
} = require("./Validator");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Add User

const addUser = async (req, res) => {
  try {
    const userData = req.body;

    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    let {
      userName,
      userEmail,
      userPassword,
      userContact,
      userAddress,
      gender,
      age,
    } = userData;

    // User Name Validation

    if (!isValid(userName)) {
      return res.status(400).json({ msg: "User Name is Required" });
    }

    if (!isValidName(userName)) {
      return res.status(400).json({ msg: "InValid User Name" });
    }

    // User Email Validation
    if (!isValid(userEmail)) {
      return res.status(400).json({ msg: "User Email is Required" });
    }

    if (!isValidEmail(userEmail)) {
      return res.status(400).json({ msg: "InValid User Email" });
    }

    let duplicateEmail = await userModel.findOne({ userEmail });
    if (duplicateEmail) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    // User Password Validation

    if (!isValid(userPassword)) {
      return res.status(400).json({ msg: "User Password is Required" });
    }

    if (!isValidPassword(userPassword)) {
      return res
        .status(400)
        .json({
          msg: "Password must be contain 6-20 words , 1 uppercase, 1 lowercase, 1 number and 1 special chercter",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(userPassword, salt);

    // User Contact Validation

    if (!isValid(userContact)) {
      return res.status(400).json({ msg: "User Contact is Required" });
    }

    if (!isValidContact(userContact)) {
      return res.status(400).json({ msg: "InValid User Contact" });
    }

    let duplicateContact = await userModel.findOne({ userContact });
    if (duplicateContact) {
      return res.status(400).json({ msg: "Contact Already Exists" });
    }

    // User Address Validation

    if (!isValid(userAddress)) {
      return res.status(400).json({ msg: "User Address Is Required" });
    }

    if (!isValidAddress(userAddress)) {
      return res.status(400).json({ msg: "Invalid User Address" });
    }

    // User Gender Validation

    if (!isValid(gender)) {
      return res.status(400).json({ msg: "User Gender is Required" });
    }

    let validGenders = ["male", "female", "others"];
    if (!validGenders.includes(gender.trim().toLowerCase())) {
      return res
        .status(400)
        .json({ msg: "Gender must be 'male', 'female' and 'other' " });
    }

    // User Age Validation

    if (!isValid(age)) {
      return res.status(400).json({ msg: "User Age is Required" });
    }

    if (!isValidAge(age)) {
      return res.status(400).json({ msg: "Invalid User Age" });
    }

    let user = await userModel.create({
      userName,
      userEmail,
      userContact,
      userPassword: hashpassword,
      userAddress,
      gender,
      age,
    });
    return res.status(201).json({ msg: "User Data Added Successfully", user });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get All User

const getUser = async (req, res) => {
  try {
    let userData = await userModel.find();
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update User

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid User Id" });
    }

    let loggedInUserId = req.user.userId
    if(userId !== loggedInUserId){
      return res.status(403).json({msg:"Bad Authorization !!! Invalid Token"});
    }

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ msg: "Bad Request No update data provided" });
    }

    const {
      userName,
      userEmail,
      userPassword,
      userContact,
      userAddress,
      gender,
      age,
    } = data;

    // Validate each field if it is being updated

    if (userName !== undefined) {
      if (!isValid(userName)) {
        return res.status(400).json({ msg: "User Name is Required" });
      }
      if (!isValidName(userName)) {
        return res.status(400).json({ msg: "Invalid User Name" });
      }
    }

    if (userEmail !== undefined) {
      if (!isValid(userEmail)) {
        return res.status(400).json({ msg: "User Email is Required" });
      }
      if (!isValidEmail(userEmail)) {
        return res.status(400).json({ msg: "Invalid User Email" });
      }

      let duplicateEmail = await userModel.findOne({ userEmail });
      if (duplicateEmail) {
        return res.status(400).json({ msg: "Email Already Exists" });
      }
    }

    // Password validation

    let salt;
    let hashpassword;

    if (userPassword !== undefined) {
      if (!isValid(userPassword)) {
        return res.status(400).json({ msg: "User Password is Required" });
      }
      if (!isValidPassword(userPassword)) {
        return res.status(400).json({ msg: "Invalid User Password" });
      }
      salt = await bcrypt.genSalt(10);
      hashpassword = await bcrypt.hash(userPassword, salt);
    }

    if (userContact !== undefined) {
      if (!isValid(userContact)) {
        return res.status(400).json({ msg: "User Contact is Required" });
      }
      if (!isValidContact(userContact)) {
        return res.status(400).json({ msg: "Invalid User Contact" });
      }

      let duplicateContact = await userModel.findOne({ userContact });
      if (duplicateContact) {
        return res.status(400).json({ msg: "Contact Already Exists" });
      }
    }

    if (userAddress !== undefined) {
      if (!isValid(userAddress)) {
        return res.status(400).json({ msg: "User Address Is Required" });
      }
      if (!isValidAddress(userAddress)) {
        return res.status(400).json({ msg: "Invalid User Address" });
      }
    }

    if (gender !== undefined) {
      if (!isValid(gender)) {
        return res.status(400).json({ msg: "User Gender is Required" });
      }
      let validGenders = ["male", "female", "others"];
      if (!validGenders.includes(gender.trim().toLowerCase())) {
        return res
          .status(400)
          .json({ msg: "Gender must be 'male', 'female' and 'other' " });
      }
    }

    if (age !== undefined) {
      if (!isValid(age)) {
        return res.status(400).json({ msg: "User Age is Required" });
      }
      if (!isValidAge(age)) {
        return res.status(400).json({ msg: "Invalid User Age" });
      }
    }

    // Proceed with update
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        userName,
        userEmail,
        userContact,
        userPassword: hashpassword,
        userAddress,
        gender,
        age,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res
      .status(200)
      .json({ msg: "User Data Updated Successfully", update: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete User Data

const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid User Id" });
    }

    let loggedInUserId = req.user.userId
    if(userId !== loggedInUserId){
      return res.status(403).json({msg:"Bad Authorization !!! Invalid Token"});
    }

    let deleteUser = await userModel.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ msg: "User not Found" });
    }
    return res.status(200).json({ msg: "User Data Delete Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get User By Gender

const getUserByGender = async (req, res) => {
  try {
    const gender = req.query.gender;

    if (!isValid(gender)) {
      return res.status(400).json({ msg: "Gender is Required" });
    }

    const users = await userModel.find({ gender: gender.toLowerCase() });

    if (users.length === 0) {
      return res.status(404).json({ msg: "No User Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }
    let { userEmail, userPassword } = req.body;

    if (!isValid(userEmail)) {
      return res.status(400).json({ msg: "User Email is Required" });
    }

    if (!isValid(userPassword)) {
      return res.status(400).json({ msg: "User Password is Required" });
    }

    const user = await userModel.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ msg: "User Not Found with this email" });
    }

    const matchUser = await bcrypt.compare(userPassword, user.userPassword);
    if (!matchUser) {
      return res.status(401).json({ msg: "Incorrect User Password" });
    }

    const token = jwt.sign(
      { userId: user._id, userEmail: user.userEmail },
      "my-secret-key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ msg: "Login Successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getUserByGender,
  loginUser,
};
