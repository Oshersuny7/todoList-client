import { useState } from "react";

const useSignInState = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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
    formData,
    errors,
    loading,
    submitted,
    error,
    handleChange,
    validateForm,
    setLoading,
    setSubmitted,
    setError,
  };
};

export default useSignInState;
