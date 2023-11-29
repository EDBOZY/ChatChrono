import React, { useContext, useState } from 'react'
import ss from "../img/ss.webp";
import s from "../img/search.svg";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import {db} from "../firebase"
import { Await } from 'react-router-dom';
import  {AuthContext} from "../context/AuthContext"




const Search = () => {
  const {currentuser}=useContext(AuthContext)
  const [user,setUser]=useState(null);
  const [username,setUsername]=useState("");
  const [err,setErr]=useState(false);

  const handlesearch=async()=>{
    const citiesRef = collection(db, "users");
    const q = query(citiesRef, where("displayName", "==", username));
    
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        setUser(doc.data());
      });
    }
    catch (err){
      setErr(true);
    }
    
  }
  const handlekey=(e)=>{
    e.code==="Enter" && handlesearch()
  }
  const handleselect=async()=>{
    const combinedid=currentuser.uid>user.uid?currentuser.uid+user.uid :user.uid+currentuser.uid;
    try{
      const res=await getDoc(doc(db,"chats",combinedid));
      if(!res.exists()){
        await setDoc(doc(db,"chats",combinedid),{messages:[]})

        await updateDoc(doc(db,"userchats",currentuser.uid),{
          [combinedid+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL,
          },
          [combinedid+".date"]:serverTimestamp()
        });
        await updateDoc(doc(db,"userchats",user.uid),{
          [combinedid+".userInfo"]:{
            uid:currentuser.uid,
            displayName:currentuser.displayName,
            photoURL:currentuser.photoURL,
          },
          [combinedid+".date"]:serverTimestamp()
        });
      }
    }
    catch (err){
      setErr(true);
    }
    setUser(null);
    setUsername("");
  }
  

  return (
    <div className="search">
      <div className="sform">
        <img src={s} alt="" onClick={handlesearch} />
        <input type="text" placeholder='Find your user...' onKeyDown={handlekey} onChange={e=>setUsername(e.target.value)} value={username} />
      </div>
      {err && <span>Error no user</span>}
      {user && <div className="userchat" onClick={handleselect}>
        <img src={user.photoURL} alt="" />
        <div className="userchatinfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search

{/* <a href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Freepik - Flaticon</a> */}