import { useState } from "react";

const useSignUpState = () => {

  const [signUpUserResponseState, setSignUpUserResponseState] = useState({
    error: "",
    success: "",
    loading: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setErrors({
      ...errors,
      [event.target.name]: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "This field is required";
        valid = false;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

 

  return {
    signUpUserResponseState,
    setSignUpUserResponseState,
    formData,
    setFormData,
    handleChange,
    errors,
    setErrors,
    validateForm
  };

};

export default useSignUpState;
