import React, { useState } from 'react'
import  Sidebar from "../components/Sidebar";
import  Chat from '../components/Chat'

export const Home = () => {
  
    // const [showClassB, setShowClassB] = useState(false);
  
    // const toggleClassB = () => {
    //   setShowClassB(!showClassB);
    // };
  
  return (
    <div className='home'>
        <div className="containerh">
            <Sidebar/>
            <Chat/>
            {/* {showClassB ? (
        <Sidebar onClick={toggleClassB} />
      ) : (
        <Chat onClick={toggleClassB} />
      )} */}
        </div>
    </div>
  )
}
