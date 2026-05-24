
import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './utils/supabase'
import AuthForm from './components/AuthForm'
import JobDataIndex from './components/JobDataIndex'
import JobEntryForm from './components/JobEntryForm'
import { Link, Navigate, Route, Routes } from 'react-router'

function App() {
//User Session State (if not in session/can't view data)//
    const [session, setSession] = useState(null);   
//CHECK USER SESSION//
   useEffect(()=>{
    //Current Session//
    supabase.auth.getSession().then(({data})=>{setSession(data.session)})
//Listen for Login/Logout AUTH Changes//
        const {data: {subscription},} = supabase.auth.onAuthStateChange((_event, session)=>{setSession(session)});
//Clean Up//
        return ()=> subscription.unsubscribe();
   }, []);
//Logout//
async function handleLogout() {
    try {
        await supabase.auth.signOut();
        setMessage("Logged Out");
    } catch (error) {
        console.log(error)
    }
}
   

  return (
    <>
      <h1>Capstone</h1>
      {/*Logged in Nav*/}
      {session && (
        <nav>
          <Link to="/jobs">Jobs</Link>
          <Link to="/add-job">Add Job</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      )}
      <Routes>
      {/*Logged Out*/}
      {!session ? (
        <>
        <Route path="/" element={<AuthForm />} />
        <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
        {/*ONLY Show App if Logged In*/}
        <Route path="/add-job" element={<JobEntryForm />} />
        <Route path="/jobs" element={<JobDataIndex />} />
        <Route path="*" element={<Navigate to="/add-job" />} />
        </>
      )}
      </Routes>
    </>
  );
}

export default App
