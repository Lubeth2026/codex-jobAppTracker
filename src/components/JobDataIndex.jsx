
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import "./JobDataIndex.css";
import { Link } from "react-router";
import SortJobs from "./SortJobs";

function JobDataIndex() {
//READ from Database State//
  const [jobs, setJobs] = useState([]);
//Sorting Jobs State//
  const [sortOption, setSortOption] = useState("");
//Sorting Logic//
  const sortedJobs = [...jobs];

  if(sortOption === "company"){
    sortedJobs.sort((a, b)=> a.company.localeCompare(b.company));
  }
  if(sortOption === "status"){
    sortedJobs.sort((a, b)=> a.status.localeCompare(b.status));
  }
  if(sortOption === "date"){
    sortedJobs.sort((a, b)=> new Date(b.applied_date) - new Date(a.applied_date));
  }

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
      const { error } = await supabase.from("tracker").delete().eq("id", id);
      if (error) {
        console.log(error);
      } else {
        fetchJobs();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/*READ from Database*/}
      <h2 className="card-title">Job App Tracker:</h2>
      <SortJobs sortOption={sortOption} setSortOption={setSortOption} />
      {sortedJobs.map((job) => (
        <div className="index-card" key={job.id}>
          <h3 style={{ textDecoration: "underline" }}>{job.company}</h3>
          <p>Position: {job.position}</p>
          <p>Status: {job.status}</p>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Notes: {job.notes}</p>
          <p>Applied Date: {job.applied_date}</p>
          <Link to={`/edit-job/${job.id}`}>Edit</Link>
          <button onClick={() => handleDelete(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default JobDataIndex;
