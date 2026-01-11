import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';


const Navbar = () => {
  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);





  const  handleLogout = async ()=>{
    try{


      await axios.post(BASE_URL + "/logout",{},{withCredentials:true});
      dispatch(removeUser());
      return navigate("/login");
    }catch(err){

    }

  }
  return (
   <div className="navbar bg-slate-900 text-slate-100 shadow-sm  ">
  
  {/* LEFT SIDE */}
  <div className="navbar-start">
    <a className="btn btn-ghost text-xl text-cyan-400">
  BikeTinder
</a>
  </div>

  {/* RIGHT SIDE */}

  {user && (

      
  <div className="navbar-end">
     Welcome,{user.firstName}
   
    <div className="dropdown dropdown-end">
   
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="avatar"
            src={user.photoUrl}
          />
        </div>
      </div>

      <ul
  tabIndex={0}
  className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
>
  <li> <Link to="/profile">Profile</Link></li>
  <li><a>Settings</a></li>
  <li><a className="text-red-400" onClick={handleLogout}>Logout</a></li>
</ul>
    </div>
  </div>
  )}

</div>













  )
}

export default Navbar
