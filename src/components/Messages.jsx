import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
  const {data}=useContext(ChatContext);
  const [messages,SetMessages]=useState([]);

  useEffect(()=>{
    const unsub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && SetMessages(doc.data().messages)
    });
    return ()=>{
      unsub();
    };
  },[data.chatId]);

  return (
    <div className="messages">
      
      {messages.map((m)=>(
        <Message message={m}  key={m.id}/>
      ))}
    </div>
  );
};

export default Messages