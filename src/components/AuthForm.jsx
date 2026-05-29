
import React, { useState } from 'react'
import { supabase } from '../utils/supabase'
import './AuthForm.css'

function AuthForm() {
//Authentication State//
    const [isLogin, setIsLogin] = useState(true);
    const [formInputs, setFormInputs] = useState({
        name: "", email: "", password: "",
    });
    const [message, setMessage] = useState("");

function handleChange(event){
    setFormInputs({
        ...formInputs,
        [event.target.name]: event.target.value,
    })
}
//Sign Up//
async function handleSignUp(event) {
    event.preventDefault();
    try {
        if( !formInputs.name || !formInputs.email || !formInputs.password ){
            setMessage("Please fill out all required fields.");
            return;
        }
        {/*OPTIONS Stores the user's name in supabase auth metadata*/}
    const {error} = await supabase.auth.signUp({
        email: formInputs.email, password: formInputs.password,
        options: { data: { name: formInputs.name }}
    });
       if(error){
        setMessage(error.message);
       } else {
        setMessage("Account Created! Check your email.")
       }
    } catch (error) {
       console.log(error) 
    }
}
//Login//
async function handleLogin(event) {
    event.preventDefault();
    try {
        if(!formInputs.email || !formInputs.password){
            setMessage("Email and password required");
            return;
        }
    const {error} = await supabase.auth.signInWithPassword({
        email: formInputs.email, password: formInputs.password,
    });
       if(error){
        setMessage(error.message);
       } else {
        setMessage("Login Successful");
       }
    } catch (error) {
       console.log(error) 
    }
}


  return (
    <div >
      <h2 className="auth-title">{isLogin ? "Login" : "Create Account"}</h2>
      {message && <p>{message}</p>}
      <form className="input-auth" onSubmit={isLogin ? handleLogin : handleSignUp}>
      {/*Show name ONLY for Sign Up*/}
      {!isLogin && (
        <label className="input-row">Name:
            <input type="text" name="name" id="name" value={formInputs.name} onChange={handleChange} required />
        </label>
      )}
       <label className="input-row">Email:
        <input type="email" name="email" id="email" value={formInputs.email} onChange={handleChange} required />
       </label>
       <label className="input-row">Password:
        <input type="password" name="password" id="password" value={formInputs.password} onChange={handleChange} 
        required />
       </label>
       {/*Conditional Button*/}
       <button className="auth-button" type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
       {/*Toggle Buttons*/}
       {isLogin ? ( <p className="auth-subtitle">Need an account?<button className="auth-button" onClick={()=>{
        setIsLogin(false);
        setMessage("");
       }}>Sign Up</button></p>) : (
        <p className="auth-subtitle">Already have an account?
        <button className="auth-button" onClick={()=>{
            setIsLogin(true);
            setMessage("");
        }}>Login</button></p>
       )}
    </div>
  )
}

export default AuthForm