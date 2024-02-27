// import React, { useState } from "react";
// import SignInComponent from "./components/SignInComponent";
// import SignInAlert from "./components/SignInAlert"; 
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SignInPage = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(""); 

//   const SignInUserApiRequest = async (email, password) => {
//     try {
//       const base64password = btoa(password);
//       console.log(base64password);
//       password = base64password;
//       const response = await axios.post(
//         "http://localhost:8000/users/signin",
//         {
//           email:email,
//           password:base64password,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       const accessToken = response.data.accessToken;
//       const isAdmin = await getRole();
//       return { accessToken, isAdmin };
//     } catch (error) {
//       console.error("Error during sign-in:", error);
//       throw error;
//     }
//   };

//   const getRole = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:8000/users/getrole", {
//         withCredentials: true,
        
//       });
//       return data.isAdmin;
//     } catch (error) {
//       console.error("Error getting role:", error);
//       throw error;
//     }
//   };

//   const handleSignIn = async (email, password) => {
//     try {
//       console.log("Before API request");
//       const { isAdmin } = await SignInUserApiRequest(email, password);
//       console.log("After API request", isAdmin);

//       if (isAdmin) {
//         navigate("/admin");
//       } else {
//         navigate("/user");
//       }
//     } catch (error) {
//       console.error("Error during sign-in:", error);
//       setError("Invalid email or password"); 
//     }
//   };

//   return (
//     <>
//       <SignInAlert error={error} /> 
//       <SignInComponent handleSignIn={handleSignIn} />
//     </>
//   );
// };

// export default SignInPage;


import React, { useState } from "react";
import SignInComponent from "./components/SignInComponent";
import SignInAlert from "./components/SignInAlert"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(""); 

  const SignInUserApiRequest = async (email, password) => {
    try {
      const base64password = btoa(password);
      console.log(base64password);
      password = base64password;
      const response = await axios.post(
        "http://localhost:8000/users/signin",
        {
          email:email,
          password:base64password,
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
      console.error("Error during sign-in:", error);
      throw error;
    }
  };

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

  const handleSignIn = async (email, password) => {
    try {
      console.log("Before API request");
      const { isAdmin } = await SignInUserApiRequest(email, password);
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

  return (
    <>
      <SignInAlert error={error} /> 
      <SignInComponent handleSignIn={handleSignIn} />
    </>
  );
};

export default SignInPage;
