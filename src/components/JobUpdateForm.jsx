
import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useNavigate, useParams } from 'react-router'
import './JobUpdateForm.css'

function JobUpdateForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: "", position: "", status: "", location: "",
    });
//Fetch Current Jobs//
   useEffect(()=>{
async function fetchJob() {
    try {
        const {data, error} = await supabase.from("tracker").select("*").eq("id", id).single();
        if(error){
            console.log(error)
        } else {
            setFormData(data);
        }
    } catch (error) {
        console.log(error)
    }
}
    fetchJob();
   }, [id]);
//Handle Inputs//
function handleChange(event){
    setFormData({
        ...formData,
        [event.target.name]: event.target.value,
    })
}
//Update Job//
async function handleSubmit(event) {
    event.preventDefault();
    try {
       const {error} = await supabase.from("tracker").update({
        company: formData.company, position: formData.position, status: formData.status, 
        location: formData.location,
       }).eq("id", id);
       if(error){
        console.log(error)
       } else {
        navigate("/jobs");
       }
    } catch (error) {
       console.log(error) 
    }
}


  return (
    <div>
      <form className="update-form" onSubmit={handleSubmit}>
        <label className="input-row">Company:
            <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} required />
        </label>
        <label className="input-row">Position:
            <input type="text" name="position" id="position" value={formData.position} onChange={handleChange} required />
        </label>
        <label className="input-row">Status:
            <input type="text" name="status" id="status" value={formData.status} onChange={handleChange} required />
        </label>
        <label className="input-row">Location:
            <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required />
        </label>
        <button type="submit">Update Job</button>
      </form>  
    </div>
  )
}

export default JobUpdateForm