import React from 'react'
import s from "../img/s.png";
import ss from "../img/ss.webp";
import logo from "../img/WE CHAT.png"
import sss from "../img/sss.png";
import { Navigate, useNavigate } from 'react-router-dom';



export const Entry = () => {
    const navigate = useNavigate();
  return (
    <div className='full'>
        <nav className='nav'>
            <div className='lnav'>ChatChrono</div>
            <button onClick={()=>{navigate("/login")}} className='rnav'>Login/Sign Up</button>
        </nav>
        <div className='container'>
            <div className='wrappere'>
                <div className='wrape'>
                    <div className="le">
                        <p>Lets chat with our <br/>Closest ones in a click</p>
                        <p></p>

                        <span>We provide a real time chatting facility with your friends</span>
                        <span>complefely free of cost</span>
                        <span className='link'>Feel like to join? click below</span>
                        <button onClick={()=>{navigate("/login")}} className='be'>Login/Sign Up</button>
                    </div>
                    <div className="re">
                        <img className="img1" src={s} alt="" />
                        {/* <img src={ss} alt="" /> */}
                        <img src={sss} className='img2' alt="" />


                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>
  )
}
