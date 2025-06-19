import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, SetFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
    age: "",
  });

  const [errors, setErrors] = useState({});

  const validataForm = () => {
    let errorMsg = {}

    let {name , email, password, phone, address, gender, age} = formData

    // Name Validation
    if(name.trim().length < 2) errorMsg.name = "Name Must be 2 Character Long";

    const isValidName = /^[a-zA-Z ]*$/;
    if(!isValidName.test(name)) errorMsg.name = "Enter a Valid Name";

    // Email Validation
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!isValidEmail.test(email)) errorMsg.email = "Enter a Valid Email";

    // Password Validation
    let isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;
    if(!isValidPassword.test(password)) errorMsg.password = "Enter a Valid Password";

    // Phone Validation
    const isValidPhone = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    if(!isValidPhone.test(phone)) errorMsg.phone = "Enter a Valid Contact Number";

    // Address Validation
    if(address.trim().length === 0 ){
      errorMsg.address = "Addres is Required"
    }

    // Gender Validation
    if(!gender){
        errorMsg.gender = "Gender is Required"
    } 

    // Age Validation
    if (!age || age < 1 || age > 120){
        errorMsg.age = "Enter a valid age"
    }
    return errorMsg
  };

  const changeHandler = (e) => {
    let { name, value } = e.target;
    // console.log(name,value);
    SetFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let validator = validataForm();
    setErrors(validator);
    if(Object.keys(validator).length === 0 ){

      let userExisted = JSON.parse(localStorage.getItem("user-info")) || [];
      let updatedUser = [...userExisted,formData];
      localStorage.setItem("user-info" , JSON.stringify(updatedUser));

      toast.success("Form Submitted Successfully");
      SetFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        gender: "",
        age:"",
      });
    }
  };

  return (
    <form className="c1" onSubmit={submitHandler}>
      <ToastContainer position="top-center" autoClose={1000} />
      <h2 className="mn">E-Commerce Website</h2>
      <h3>Create a new Account</h3>
      <p>It's quick and easy</p>

      <label htmlFor="nam"></label>
      <input
        type="text"
        placeholder="Enter Your Name"
        id="nam"
        name="name"
        value={formData.name}
        onChange={changeHandler}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <br />
      <br />

      <label htmlFor="email"></label>
      <input
        type="email"
        placeholder="Enter Your Email "
        id="email"
        name="email"
        value={formData.email}
        onChange={changeHandler}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <br />
      <br />

      <label htmlFor="pass"></label>
      <input
        type="password"
        placeholder="Enter Your Password"
        id="pass"
        name="password"
        value={formData.password}
        onChange={changeHandler}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <br />
      <br />

      <label htmlFor="no"></label>
      <input
        type="number"
        placeholder="Enter Your Phone No."
        id="no"
        name="phone"
        value={formData.phone}
        onChange={changeHandler}
      />
      {errors.phone && <span className="error">{errors.phone}</span>}

      <br />
      <br />

      <label htmlFor="add"></label>
      <input
        type="text"
        placeholder="Enter Your  Address"
        id="add"
        name="address"
        value={formData.address}
        onChange={changeHandler}
      />
      {errors.address && <span className="error">{errors.address}</span>}

      <br />
      <br />

        <label htmlFor="gender"></label>
        <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={changeHandler}
        className="jh"
        >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        </select>
      {errors.gender && <span className="error">{errors.gender}</span>}

      <br />
      <br />

      <label htmlFor="age"></label>
      <input
        type="number"
        id="age"
        name="age"
        placeholder="Enter Your Age"
        value={formData.age}
        onChange={changeHandler}
       />
      {errors.age && <span className="error">{errors.age}</span>}

      <br />
      <br />

      <button type="submit">Sign Up</button>
      <br />
      <br />
      <ul>
        <Link to="/login" className="nav-link fs-5 text-info">
          Already have an account?
        </Link>
      </ul>
    </form>
  );
}

export default SignUp;
