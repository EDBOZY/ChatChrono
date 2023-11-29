import React, { useContext, useState } from 'react'
import io from "../img/attachi.png"
import attach from "../img/attach.png"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {v4 as uuid } from "uuid"
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {

  const [text,setText]=useState("");
  const [img,setImg]=useState(null);

  const {currentuser}=useContext(AuthContext);
  const {data}=useContext(ChatContext);
  const handlekey=(e)=>{
    e.code==="Enter" && handlesubmit()
  }

  const handlesubmit=async()=>{
    if(img){
      const storageRef = ref(storage,uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(

        (error)=>  {
           
          
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId),{
              messages: arrayUnion({
                id:uuid(),
                text,
                senderId:currentuser.uid,
                date:Timestamp.now(),
                img:downloadURL,
              }),
            });
          });
        }
      );
      
    }
    else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentuser.uid,
          date:Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userchats", currentuser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userchats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }
  return (
    <div className='input'>
      <input type="text" value={text} placeholder='Type Something...' onKeyDown={handlekey} onChange={(e)=>setText(e.target.value)}  />
      <div className='send'>
        <img src={attach} alt="" />
        <label htmlFor="file">
          <img src={io} alt="" />
        </label>
        <input type="file" style={{display:"none"}} id="file" onChange={(e)=>setImg(e.target.files[0])} />

        <button onClick={handlesubmit}>Send</button>
      </div>
    </div>
  )
}

export default Input