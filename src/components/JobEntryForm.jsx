
import React, { useState } from 'react'
import { supabase } from '../utils/supabase'
import './JobEntryForm.css'

function JobEntryForm() {
//Controlled Form State//
     const [formData, setFormData] = useState({
      company: "", position: "", status: "", location: "", salary: "", notes: "", applied_date: ""
     });
//ERROR State (can't add submit an empty form)//
     const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event){
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
        if (!formData.company || !formData.position || !formData.status) {
          setErrorMessage("Please fill out all required fields.");
          return;
        }
        setErrorMessage("");
      const {error} = await supabase.from("tracker").insert([formData]);
      if(error){
        console.log(error)
      } else {
        console.log("Job Entry Added")
      }
      //Clear Form//
      setFormData({
        company: "", position: "", status: "", location: "", salary: "", notes: "", applied_date: ""
      })
    } catch (error) {
      console.log(error)
    }
}


  return (
    <div>
        <form className="entry-form" onSubmit={handleSubmit}>
          <h2>Add New Job Form</h2>
          {errorMessage && <p>{errorMessage}</p>}
          <label className="input-row">Company:
            <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} required />
          </label>
          <label className="input-row">Location:
            <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} />
          </label>
          <label className="input-row">Position:
            <input type="text" name="position" id="position" value={formData.position} onChange={handleChange} required />
          </label>
          <label className="input-row">Salary:
            <input type="text" name="salary" id="salary" value={formData.salary} onChange={handleChange} />
          </label>
          <label className="input-row">Status:
            <select type="text" name="status" id="status" value={formData.status} onChange={handleChange} 
            required >
              <option value="">Select Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Declined">Declined</option>
            </select>
          </label>
          <label className="input-row">Notes:
            <textarea rows={5} cols={22} name="notes" id="notes" value={formData.notes} onChange={handleChange} ></textarea>
          </label>
          <label className="input-row">Applied Date:
            <input type="date" name="applied_date" id="applied_date" value={formData.applied_date} 
            onChange={handleChange} />
          </label>
          <button className="button-entry" type="submit">Add Job</button>
        </form>
    </div>
  )
}

export default JobEntryForm