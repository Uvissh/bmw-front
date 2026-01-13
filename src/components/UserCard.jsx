import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";


const UserCard = ({ user }) => {
  const { _id,firstName, lastName, photoUrl, age, gender, about } = user;
 const  dispatch = useDispatch();


  const handleSendReqeust =async(status,userId)=>{
    try{
      const res = await axios.post(BASE_URL + "/request/send/" + status +"/"+ userId,
        {},
        {

          withCrendentials:true
        }
      
      );
      dispatch(removeFeed(userId))

    }catch(err){
      console.log(err)
    }
  
  }

  return (
    <div className="flex justify-center">
      <div className="card w-96 rounded-3xl overflow-hidden 
        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
        text-slate-100 shadow-2xl border border-slate-700
        hover:scale-[1.02] transition-all duration-300">

        {/* IMAGE */}
        <figure className="h-64 relative">
          <img
            src={photoUrl || "https://via.placeholder.com/300"}
            alt="user"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30" />
        </figure>

        {/* BODY */}
        <div className="card-body gap-3">
          <h2 className="card-title text-2xl font-bold tracking-wide">
            {firstName} {lastName}
          </h2>

          {(age || gender) && (
            <div className="flex gap-2 items-center text-sm text-slate-300">
              {age && <span>{age} yrs</span>}
              {gender && (
                <span className="badge badge-outline border-slate-400 text-slate-200 capitalize">
                  {gender}
                </span>
              )}
            </div>
          )}

          <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
            {about}
          </p>

          {/* ACTIONS */}
          <div className="card-actions justify-between mt-6">
            {/* Ignore */}
            <button className="btn btn-error btn-sm text-white shadow-md hover:shadow-lg"
            onClick={()=>handleSendReqeust("ignored",_id)}>
              Ignore
            </button>

            {/* Send */}
            <button className="btn btn-primary btn-sm shadow-md hover:shadow-lg"
            onClick={()=>handleSendReqeust("interested",_id)}>
              Interested
            </button>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
