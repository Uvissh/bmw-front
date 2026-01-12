import React, { useState } from 'react'
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
const EditProfile = ({user}) => {

  const[firstName,setFirstName] = useState(user?.firstName);
  const[lastName,setLastName] = useState(user?.lastName);
  const[photoUrl,setPhotoUrl] = useState(user?.photoUrl);
  const[age,setAge] = useState(user?.age);
  const[gender,setGender] = useState(user?.gender);
  const[about,setAbout] = useState(user?.about);
  const [error,setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  

  const saveProfile =async()=>{

    //before saving the data clear the previous  error
        setError("");

    try{
      const res = await axios.patch(BASE_URL + "/profile/edit",{
        firstName,lastName,photoUrl,age,about

      },{
        withCredentials:true
      });
      dispatch(addUser(res.data.data));

       setShowToast(true);

    // ⏱ AUTO HIDE AFTER 3s
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
      
    }catch(err){
      setError(err.response.data)
      
    }

  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-base-300 px-6 py-10">



      {showToast && (
  <div className="toast toast-top toast-end z-50">
    <div className="alert alert-info shadow-lg rounded-xl">
      <span>✅ Profile updated successfully!</span>
    </div>
  </div>
)}

     

      {/* MAIN WRAPPER */}
      <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl w-full">

        {/* ================= FORM CARD ================= */}
        <div className="flex justify-center w-full lg:w-1/2">
          <div
            className="
              card w-full max-w-md
              shadow-2xl border
              rounded-3xl
              hover:scale-[1.02]
              transition-all duration-300
            "
            style={{
              background:
                "linear-gradient(135deg, #ffffff 45%, #0066B1 45%, #00A3E0 65%, #E4002B 85%)",
            }}
          >
            <div className="card-body px-8 py-7 space-y-4">

              <h2 className="card-title justify-center text-black text-2xl mb-2">
                Edit Profile
              </h2>

              {/* INPUTS (UNCHANGED) */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">firstName</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  placeholder="Enter your firstName"
                  onChange={(e)=> setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">lastName</legend>
                <input
                  value={lastName}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter the lastName"
                  onChange={(e)=>setLastName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">photoUrl</legend>
                <input
                  value={photoUrl}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter the lastName"
                  onChange={(e)=>setPhotoUrl(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">age</legend>
                <input
                  value={age}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter your age"
                  onChange={(e)=>setAge(e.target.value)}
                />
              </fieldset>

             

              <fieldset className="fieldset">
                <legend className="fieldset-legend">about</legend>
                <input
                  value={about}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter about yourself"
                  onChange={(e)=>setAbout(e.target.value)}
                />
              </fieldset>

              {/* BUTTON */}
              <div className="card-actions justify-center pt-4">
                <div  className='text-red-400'> {error}</div>
                <button className="btn bg-black hover:bg-[#0066B1] text-white border-none w-full" onClick={saveProfile}>
                  saveProfile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LIVE PREVIEW ================= */}
        <div className="flex justify-center w-full lg:w-1/2 mt-6 lg:mt-0">
          <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
        </div>

      </div>
    </div>
  )
}

export default EditProfile;
