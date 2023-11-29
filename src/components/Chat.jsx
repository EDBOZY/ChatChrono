import React, { useContext } from 'react'
import cam from "../img/cam.png"
import add from "../img/add.png"
import more from "../img/more.png"
import wat from "../img/WhatsApp.svg"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext';



function RenderConditionally({ condition,data }) {
  //const {data}=useContext(ChatContext);
  if (condition) {
    return <div className='chat'>
    
    <div className="chatinfo">
      <img src={more}  className="mob"alt=""  />
      <span>{condition}</span>
      <div className="chaticons">
        <img src={cam} alt="" />
        <img src={add} alt="" />
        <img src={more} alt="" />
      </div>
    </div>
  
   
  <Messages />
  <Input/> 
</div>;
  } else {
    return <div className='chat'><img className='spe' src={wat} alt="" /></div>;
  }
}


 
const Chat = () => {
   const {data}=useContext(ChatContext);
  const condition=data.user.displayName;
  return(
    <RenderConditionally condition={condition} data={data} />
     // or false
  
    
  
    
  //     <div className='chat'>
    
  //     <div className="chatinfo">
  //       <img src={more}  className="mob"alt=""  />
  //       <span>{data.user?.displayName}</span>
  //       <div className="chaticons">
  //         <img src={cam} alt="" />
  //         <img src={add} alt="" />
  //         <img src={more} alt="" />
  //       </div>
  //     </div>
    
     
  //   <Messages />
  //   <Input/> 
  // </div>
    
   
     
    
  
  
  )
}

export default Chat