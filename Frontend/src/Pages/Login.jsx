import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });

    const [errors, setErrors] = useState({});

    const validataForm = () => {
        let errorMsg = {};

        let { email, password } = formData;

        // Email Validation
        const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!isValidEmail.test(email)) errorMsg.email = "Enter a Valid Email Address";

        // Password Validation
        let isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;
        if (!isValidPassword.test(password)) errorMsg.password = "Enter a Valid Password";

        return errorMsg;
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
    if (Object.keys(validator).length === 0) {

      let userExisted = JSON.parse(localStorage.getItem("user-info")) || [];
      let updatedUser = [...userExisted, formData];
      localStorage.setItem("user-info", JSON.stringify(updatedUser));

      toast.success("Form Submitted Successfully");
      SetFormData({
        email: "",
        password: "",
      });
    }
  };

  return (

    <form className="c1" onSubmit={submitHandler}>
      <ToastContainer position="top-center" autoClose={2000}/>  
      <h2 className="k1">E-Commerce Website</h2>
      <br />
      <b>Login To Website</b>
      <br />
      <br />

      <label htmlFor="email"></label>
      <input type="email" placeholder="Enter Your Email Address"
       id="email"
       name="email"
       value={formData.email}
       onChange={changeHandler}
      />
      {errors.email && <span className="error">{errors.email}</span>}
      <br />
      <br />

      <label htmlFor="pass"></label>
      <input type="password" placeholder="Enter Your Password " 
       id="pass"
       name="password"
       value={formData.password}
       onChange={changeHandler}
      />
      {errors.password && <span className="error">{errors.password}</span>}
      <br />
      <br />

      <button type="submit">Login</button>
      <br />
      <br />
      <ul>
        <Link to="/signup" className="nav-link fs-5 text-info">
          Doesn't have an Account? Sign Up
        </Link>
      </ul>
    </form>
  );
}

export default Login;
