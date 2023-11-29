import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { auth } from '../firebase';


export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className='container'>
        <div className='wrapper'>
            <span className='logo'>ChatChrono</span>
            <span className='title'>Login</span>
            <form onSubmit={submit}>
                
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <button>Sign In</button>
                {err && <span>Something is wrong</span>}
            </form>
            <p>already having a account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}
