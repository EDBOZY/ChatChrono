import React, { useState } from 'react'
import add from "../img/addAvatar.png"
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth,storage,db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, useNavigation,Link } from 'react-router-dom';

export const Register = () => {
  const [err,setErr]=useState(false)
  const navigate=useNavigate();
  const submit=async(e)=>{
    e.preventDefault();
    //console.log(e.target[0].value);
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage,displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userchats", res.user.uid), {});
            navigate("/home");
          } catch (err) {
            // console.log(err);
            setErr(true);
            // setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      // setLoading(false);
    }
  };
  //     const storageRef = ref(storage,displayName);

  //     const uploadTask = uploadBytesResumable(storageRef, file);

    
  //     uploadTask.on(

  //       (error)=>  {
  //         //  setErr(true)
          
  //       }, 
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
  //           await updateProfile(res.user,{
  //             displayName,
  //             photoURL:downloadURL,
  //           })
  //           await setDoc(doc(db,"users",res.user.uid),{
  //             uid:res.user.uid,
  //             displayName,
  //             email,
  //             photoURL: downloadURL,
  //           });

  //           await setDoc(doc(db,"userchats",res.user.uid),{});
  //           navigate('/home');
  //         });
  //       }
  //     );
      
      
  //   } catch (err) {
  //     setErr(true);
  //     // setLoading(false);
  //   }
  // };

    // try{
    //   //AUTH
    //   const res=  await createUserWithEmailAndPassword(auth, email, password)
      
    //   //IMAGE STORANGE
    //   const storageRef = ref(storage, displayName);
    //   await uploadBytesResumable(storageRef, file).then(() => {
    //     getDownloadURL(storageRef).then(async (downloadURL) => {
    //       try {
    //         //Update profile
    //         await updateProfile(res.user, {
    //           displayName,
    //           photoURL: downloadURL,
    //         });
    // //  const uploadTask = uploadBytesResumable(storageRef, file);
    // //   uploadTask.on(

    // //     (error) => {
    // //       setErr(true);
    // //     }, 
    // //     () => {
    // //       getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
    // //         await updateProfile(res.user,{
    // //           displayName,
    // //           photoURL:downloadURL,
    // //         });
    //         // console.log('File available at', downloadURL);
    //         await setDoc(doc(db,"users",res.user.uid),{
    //           uid:res.user.uid,
    //           displayName,
    //           email,
    //           photoURL:downloadURL,
    //         });
    //       });
    //     }
    //   );
        
    // }
    // catch(err){
    //   setErr=(true);
    // }



  
  return (
    
    <div className='container'>
        <div className='wrapper'>
            <span className='logo'>ChatChrono</span>
            <span className='title'>Register</span>
            <form onSubmit={submit}>
                <input type="text" placeholder='Display Name'/>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                
                <input style={{display:"none"}} className='file' type="file" id="file"/>
                <label htmlFor="file">
                  <img src={add} alt="" />
                  <span>add an avatar</span>
                </label>
                <button>Sign Up</button>
                {err&&<span>Something is wrong do again</span>}
            </form>
            <p>already having a account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}
