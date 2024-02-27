import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpComponent from "./components/SignUpComponent";
import axios from "axios";
import SignUpAlert from "./components/SignUpAlert";
import { useState } from "react";

const SignUpPage = () => {
  
  const navigate = useNavigate();
  const [error, setError] = useState(""); 

  const SignUpUserApiRequest = async(name,lastName,email,password) => {
    try {
      const base64password = btoa(password);
      console.log(base64password);
      password = base64password;
      const response = await axios.post(
        "http://localhost:8000/users/signup",
        {
          name,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Client-Type": "web" 
          }
        }
      );
      const accessToken = response.data.accessToken;
      const isAdmin = await getRole();
      return { accessToken, isAdmin };
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw error;
    }
  }

  const getRole = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/users/getrole", {
        withCredentials: true,
        headers: {
          "Client-Type": "web" 
        }
      });
      return data.isAdmin;
    } catch (error) {
      console.error("Error getting role:", error);
      throw error;
    }
  };

  const handleSignUp = async (name,lastName,email, password) => {
    try {
      console.log("Before API request");
      const { isAdmin } = await SignUpUserApiRequest(name,lastName,email, password);
      console.log("After API request", isAdmin);

      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("Invalid email or password"); 
    }
  };

  return(
    <>
    <SignUpAlert error={error}/>
    <SignUpComponent handleSignUp={handleSignUp} />;
    </>
    
    ) 
};

export default SignUpPage;


