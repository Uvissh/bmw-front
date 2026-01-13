import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests,removeRequest } from '../utils/requestSlice'


const Request = () => {
    const requests = useSelector((store)=>store.requests);
    const dispatch = useDispatch();


const reviewRequest =async(status,_id)=>{

  try{
  const res= await axios.post(BASE_URL + "/request/review/"+status+"/"+_id ,
    {},{
    withCredentials:true,
  });
  dispatch(removeRequest(_id));
}catch(err){
  console.log(err);
}
}


    const  fetchRequest =async()=>{

        const res = await axios.get(BASE_URL +"/user/requests/received",{
            withCredentials:true,
        })

        console.log(res.data.data);
        dispatch(addRequests(res.data.data));

    }
    useEffect(()=>{
        fetchRequest();
    },[]);

    if(!requests) return;

    if(requests.length === 0) return <h1>No Request Found</h1>
  return (
    <div>

         <div className="min-h-screen bg-base-200 py-10 px-4">
    <h1 className="text-3xl font-bold text-center mb-8">
    Requests
    </h1>

    <div className="max-w-4xl mx-auto space-y-6">
      {requests.map((request) => {
        const { _id,firstName, lastName, photoUrl, age, gender, about } = request.fromUserId

        return (


           
          <div
          
            key={_id}
            className="flex items-center gap-6 bg-base-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            {/* Profile Image */}
            <img
              src={photoUrl}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border"
            />

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {firstName} {lastName}
              </h2>

              <p className="text-sm text-gray-500">
                {age} • {gender}
              </p>

              <p className="mt-2 text-gray-700">
                {about}
              </p>
            </div>

<div className="flex flex-col gap-3">
  <button
    onClick={() => reviewRequest("accepted", request._id)}
    className="btn bg-green-500 hover:bg-green-600 text-white 
               flex items-center gap-2 px-6 rounded-full 
               transition-all duration-200 hover:scale-105"
  >
    ✅ Accept
  </button>

  <button
    onClick={() => reviewRequest("rejected", request._id)}
    className="btn bg-red-500 hover:bg-red-600 text-white 
               flex items-center gap-2 px-6 rounded-full 
               transition-all duration-200 hover:scale-105"
  >
    ❌ Reject
  </button>
</div>
  </div>

        )
      })}
    </div>
  </div>
  </div>
       
      
    
  )
}

export default Request
