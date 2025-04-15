import React from "react";
import JobLocation from "./JobLocation";
import {JobPosting} from "@/ducks/jobs/types";
import {Link} from "@mui/material";
import Typography from "@mui/material/Typography";

export interface JobPostingLinkProps {
    posting: JobPosting;
}

const JobPostingLink = ({posting}: JobPostingLinkProps) => {
    const {id, title, jobLocation, datePosted, validThrough} = posting;
    const href = `#job-posting--${id}`;
    return (
        <li key={id}>
            <Link href={href}>
                {title}
                <Typography variant="subtitle2" component="span" sx={{mx: 3}}>
                    Posted: {new Date(datePosted).toLocaleDateString()}
                </Typography>
                {validThrough && (
                    <Typography variant="subtitle2" component="span">
                        Valid Through: {new Date(validThrough).toLocaleDateString()}
                    </Typography>
                )}
            </Link>
            <JobLocation location={jobLocation} hideAddress={true}/>
        </li>
    )
}

export default JobPostingLink;
