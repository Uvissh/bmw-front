import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {


   const[emailId,setEmailId] = useState("Aprilla@gmail.com");
   const[password,setPassword] = useState("Aprilla@12345");

   const dispatch = useDispatch();
   const navigate = useNavigate();


   const handleLogin = async ()=>{

    try{

      const res = await axios.post( BASE_URL + "/login",{
        emailId,
        password,
      },
      {withCredentials: true}
    );
    console.log(res.data);
       dispatch(addUser(res.data));
       return navigate("/");

    }

      catch(err){
        console.error(err);
        
      }
    }
 
   

       
  return (
    <div>
<div className="min-h-screen flex items-center justify-center bg-base-300">
  <div
    className="card w-96 shadow-xl border hover:scale-105 transition-transform duration-300"
    style={{
      background:
        "linear-gradient(135deg, #ffffff 45%, #0066B1 45%, #00A3E0 65%, #E4002B 85%)",
    }}
  >
    <div className="card-body">
      <h2 className="card-title justify-center text-black">
        Login
      </h2>

      {/* Email Field */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Email ID</legend>
        <input
          type="email"
          value={emailId}
          className="input input-bordered w-full"
          placeholder="Enter your email"
          onChange={(e)=> setEmailId(e.target.value)}
        />
       
      </fieldset>

      {/* Password Field */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Password</legend>
        <input
        value={password}
          type="password"
          className="input input-bordered w-full"
          placeholder="Enter your password"
          onChange={(e)=>setPassword(e.target.value)}

        />
      
      </fieldset>

      {/* Centered Button */}
      <div className="card-actions justify-center mt-4">
        <button className="btn bg-black hover:bg-[#0066B1] text-white border-none w-full" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  </div>
</div>




      
    </div>
  )
}

export default Login
