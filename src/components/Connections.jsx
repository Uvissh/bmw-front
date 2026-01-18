import axios from 'axios'
import React, { useEffect, useEffectEvent } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
    const connections = useSelector((store)=>store.connection);
    const dispatch = useDispatch();
    

    const fetchConnections  = async()=>{
        try{



        const  res = await axios.get(BASE_URL + "/user/connections",{
            withCredentials:true,
        })
        console.log(res.data.data);
        dispatch(addConnections(res.data.data))
        
    }catch(err){
        console.log(err.message);

    }

}
useEffect(()=>{
    fetchConnections();
},[]);

if(!connections) return;
if(connections.length === 0) return <h1>NO Connection Found</h1>





    
return (
  <div className="min-h-screen bg-base-200 py-10 px-4">
    <h1 className="text-3xl font-bold text-center mb-8">
      Connections
    </h1>

    <div className="max-w-4xl mx-auto space-y-6">
      {connections.map((connection) => {
        const { _id,firstName, lastName, photoUrl, age, gender, about } = connection

        return (
          <div
            key={firstName + lastName}
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

<Link to ={"/chat/" + _id}> <button className="
  relative px-5 py-2 text-sm font-medium text-white
  rounded-full
  bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
  shadow-lg shadow-purple-500/30
  hover:shadow-xl hover:shadow-purple-500/50
  hover:scale-105
  transition-all duration-300
">
  💬 Chat
</button>
</Link>


            </div>
          </div>
        )
      })}
    </div>
  </div>
)

}

export default Connections
