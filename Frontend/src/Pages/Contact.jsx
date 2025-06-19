import React, { useState } from "react";
import "./Contact.css";
import { ToastContainer, toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});
  
    const validataForm = () => {
        let errorMsg = {}

        let {name , email, message, phone} = formData

        // Name Validation
        if(name.trim().length < 2) errorMsg.name = "Name Must be 2 Character Long";

        const isValidName = /^[a-zA-Z ]*$/;
        if(!isValidName.test(name)) errorMsg.name = "Enter a Valid Name";

        // Email Validation
        const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!isValidEmail.test(email)) errorMsg.email = "Enter a Valid Email";

        // message validation
        if(message.trim().length === 0 ){
        errorMsg.message = "Message is Required"
        }

        // Phone Validation
        const isValidPhone = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
        if(!isValidPhone.test(phone)) errorMsg.phone = "Enter a Valid Contact Number";

        return errorMsg
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can process or send formData to backend here
        // console.log("Form submitted:", formData);
        let validator = validataForm();
        setErrors(validator);
        if(Object.keys(validator).length === 0 ){

            let userExisted = JSON.parse(localStorage.getItem("user-info")) || [];
            let updatedUser = [...userExisted,formData];
            localStorage.setItem("user-info" , JSON.stringify(updatedUser));

            // Reset form
            toast.success("Form Submitted Successfully");
            setFormData({
            name: "",
            email: "",
            message: "",
            phone: ""
            });
        }
    };

  return (
    <form className="ind" onSubmit={handleSubmit}>
      <ToastContainer position="top-center" autoClose={1000} />
      <label>Name :</label>
      <input
        type="text"
        name="name"
        placeholder="Enter Your Name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <br /><br />

      <label>Email :</label>
      <input
        type="email"
        name="email"
        placeholder="Enter Your Email Address"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <br /><br />

      <label>Message :</label>
      <input
        type="text"
        name="message"
        placeholder="Enter Your Message"
        value={formData.message}
        onChange={handleChange}
      />
      {errors.message && <span className="error">{errors.message}</span>}

      <br /><br />

      <label>Phone Number :</label>
      <input
        type="tel"
        name="phone"
        placeholder="Enter Your Number"
        value={formData.phone}
        onChange={handleChange}
      />
      {errors.phone && <span className="error">{errors.phone}</span>}

      <br /><br />

      <button type="submit" className="jeet">Submit</button>
    </form>
  );
}


export default Contact;

