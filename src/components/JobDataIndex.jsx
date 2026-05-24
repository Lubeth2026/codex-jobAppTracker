
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import "./JobDataIndex.css";
import { Link } from "react-router";

function JobDataIndex() {
//READ from Database State//
  const [jobs, setJobs] = useState([]);

//READ//
  async function fetchJobs() {
    try {
      const { data, error } = await supabase.from("tracker").select("*");
      if (error) {
        console.log(error);
      } else {
        //console.log(data);
        setJobs(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);
//DELETE// 
async function handleDelete(id) {
   try {
    const {error} = await supabase.from("tracker").delete().eq("id", id);
    if(error){
      console.log(error)
    } else {
      fetchJobs();
    }
   } catch (error) {
    console.log(error)
   }
}


  return (
    <div>
      {/*READ from Database*/}
      <h2 className="card-title">Job App Tracker:</h2>
      {jobs.map((job) => (
        <div className="index-card" key={job.id}>
          <h3 style={{ textDecoration: "underline" }}>{job.company}</h3>
          <p>Position: {job.position}</p>
          <p>Status: {job.status}</p>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Notes: {job.notes}</p>
          <p>Applied Date: {job.applied_date}</p>
          <Link to={`/edit-job/${job.id}`}>Edit</Link>
          <button onClick={()=> handleDelete(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default JobDataIndex;
