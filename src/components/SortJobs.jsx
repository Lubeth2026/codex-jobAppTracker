
import React from 'react'
import './SortJobs.css'

function SortJobs({sortOption, setSortOption}) {

  return (
    <div>
      <h3 className="sort-title">Sort Jobs</h3>
      <select name="sort" id="sort" value={sortOption} onChange={(event)=> setSortOption(event.target.value)}>
        <option value="">Select Sort</option>
        <option value="company">Company Name</option>
        <option value="status">Status</option>
        <option value="date">Date Applied</option>
      </select>
    </div>
  )
}

export default SortJobs