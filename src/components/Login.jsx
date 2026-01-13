import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return  navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async()=>{
    try{
      const res = await axios.post(BASE_URL + "/signup",
        {firstName,lastName,emailId,password},
        {withCredentials:true},
      )
      dispatch(addUser(res.data));
      return navigate("/profile");


      
    }catch(err){
      setError(err?.response?.data);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300">
      <div
        className="card w-96 shadow-2xl border hover:scale-105 transition-transform duration-300"
        style={{
          background:
            "linear-gradient(135deg, #ffffff 45%, #0066B1 45%, #00A3E0 65%, #E4002B 85%)",
        }}
      >
        <div className="card-body">
          <h2 className="card-title justify-center text-black text-2xl">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {/* Signup Fields */}
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  placeholder="Enter first name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full"
                  placeholder="Enter last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}

          {/* Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              value={emailId}
              className="input input-bordered w-full"
              placeholder="Enter email"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>

          {/* Password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm text-center mt-2">
              {error}
            </p>
          )}

          {/* Button */}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn bg-black hover:bg-[#0066B1] text-white border-none w-full"
              onClick={  isLoginForm?handleLogin:handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Toggle */}
          <p
            onClick={() => setIsLoginForm((prev) => !prev)}
            className="mt-4 text-center text-sm font-medium text-blue-800 cursor-pointer hover:underline"
          >
            {isLoginForm
              ? "New user? Sign up here"
              : "Existing user? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
