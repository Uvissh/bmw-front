import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addfeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => { 


  const feed = useSelector((store)=>store.feed);

  const dispatch = useDispatch();

  
 const getfeed = async()=>{

if(feed) return ;
  try{
    const res = await  axios.get(BASE_URL+"/feed",{withCredentials:true});

    console.log("feed",res?.data?.data);
    dispatch(addfeed(res?.data?.data))
    

  }catch(err){
    console.log(err);
  }
 }


 useEffect(()=>{
  getfeed();
 },[])

  if(!feed) return;

    if(feed.length === 0) return <h1>No new user</h1>




  return (
feed && (

    <div className='flex justify-center my=10'>
       <UserCard user={feed[0]}/>
      
    </div>
  )
)
};

export default Feed
