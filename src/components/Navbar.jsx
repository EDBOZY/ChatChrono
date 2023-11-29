import React, { useContext } from 'react'
import ss from "../img/ss.webp";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
  const {currentuser}=useContext(AuthContext)
  return (
    <div className="navbar">
      <span className="logo">ChatChrono</span>
      <div className="user">
        <img src={currentuser.photoURL} alt="" />
        <span>{currentuser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar