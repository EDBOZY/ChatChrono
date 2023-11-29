import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Chats = () => {
  const {dispatch}=useContext(ChatContext);

  const [chats,setChats]=useState([]);
  const {currentuser}=useContext(AuthContext);
  useEffect(()=>{
    const getchats=()=>{
      const unsub=onSnapshot(doc(db,"userchats",currentuser.uid),(doc)=>{
        setChats(doc.data())
      });
      return()=>{
        unsub();
      };
    };
    currentuser.uid && getchats()
    
  },[currentuser.uid]);

  const handleselect=(u)=>{
    dispatch({type:"CHANGE_USER",payload:u});
    
    
  }
  
  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(
        <div className="userchat" key={chat[0]} onClick={()=>handleselect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userchatinfo" >
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))}
      
    </div>
  )
}

export default Chats