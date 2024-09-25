import React from "react";
import {JobPosting} from "../ducks/jobs/types";
import JobLocation from "./JobLocation";

const JobPostingLink:React.FC<JobPosting> = ({id, title, jobLocation, datePosted, validThrough}) => {
    const href = `#job-posting--${id}`;
    return (
        <li key={id}>
            <a href={href}>
                {title}
                <small className="ms-3">Posted: {new Date(datePosted).toLocaleDateString()}</small>
                {validThrough && <small  className="ms-5">Valid Through: {new Date(validThrough).toLocaleDateString()}</small>}
            </a>
            <JobLocation location={jobLocation} hideAddress={true}/>
        </li>
    )
}

export default JobPostingLink;
