// import React from 'react';
import "./LoginPage.css"
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";



const LoginPage = () => {
  const navigate=useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error ,setError]=useState('')
 
   const handleUsernameChange = (e) => {
     setUsername(e.target.value);
   };
 
   const handlePasswordChange = (e) => {
     setPassword(e.target.value);
   };
 
   const onSubmit = (e) => {
     e.preventDefault();
     console.log("Submitted Credentials:");
     console.log("Username:", username);
     console.log("Password:", password);
     if(username!='demo'||password!='demo'){
       setError('Enter correct username or password!')
      return;
     }
     console.log("credentials valid");

   
     navigate('/table', { replace: true });
     return 

    
   };
  return (
    <div className='wrapper'>
        <form onSubmit={onSubmit}>

           <h1>Login</h1>

              <div className="input-box">
                 <input type="text" placeholder='username'
                 value={username}
                 onChange={handleUsernameChange}
                 required/>
                 <FaUser  className='icon'/>
              </div>

              <div className="input-box">
                 <input type="password" placeholder='password'
                 value={password}
                 onChange={handlePasswordChange}
                 required/>
                 <FaLock className='icon'/>
              </div>
              {error&&<p style={{color:'red',textAlign:'center', margin:'5px'}}>{error}</p>}
             
               <button type='submit'>Login</button>
              

        </form>
    </div>
  );
}

export default LoginPage;
