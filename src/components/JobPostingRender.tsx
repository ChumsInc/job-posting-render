import React from "react";
import {default as JobLocation} from "./JobLocation";
import JobDate from "./JobDate";
import EducationalRequirements from "./EducationalRequirements";
import {JobPosting} from "@/ducks/jobs/types";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "@/app/ErrorBoundaryFallbackAlert";
import JobPostingLD from "@/components/JobPostingLD";
import {employmentTypes} from "@/ducks/jobs/constants";
import {Box, Link, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

interface JobPostingProps {
    posting: JobPosting;
    preview?: boolean;
    isLive?: boolean;
}

const JobPostingRender = ({posting, preview, isLive}: JobPostingProps) => {
    const {
        id,
        title,
        jobLocation,
        datePosted,
        employmentType,
        description,
        educationalRequirements,
        experienceRequirements,
        experienceInPlaceOfEducation,
        filename,
        timestamp
    } = posting;

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
            <JobPostingLD posting={posting}/>
            <Paper variant="elevation" sx={{my: 3, p: 5}} elevation={3}>
                {preview && isLive && (
                    <Alert variant="filled" severity="success" title="Heads up!" sx={{mb: 3}}>This posting is
                        live.</Alert>
                )}
                {preview && !isLive && (
                    <Alert variant="filled" severity="error" title="Heads up!" sx={{mb: 3}}>This posting is NOT
                        live.</Alert>
                )}

                <Box id={'job-posting--' + id}>
                    <Typography component="h2" variant="h2" property="title">{title}</Typography>
                    <meta property="specialCommitments" content="VeteranCommit"/>
                    <section>
                        <Typography component="h3" variant="h3">Location</Typography>
                        <JobLocation location={jobLocation}/>
                    </section>
                    <section>
                        <Typography component="h3" variant="h3">Date Posted</Typography>
                        <div>
                            <JobDate date={datePosted} schemaTag='datePosted'/>
                        </div>
                    </section>
                    <section>
                        <Typography component="h3" variant="h3">Employment Type</Typography>
                        <div property="employmentType">
                            {employmentTypes[employmentType]}
                        </div>
                    </section>
                    <section className="job-opening--description">
                        <Typography component="h3" variant="h3">Description</Typography>
                        <div property="description" dangerouslySetInnerHTML={{__html: description}}/>
                    </section>
                    <section>
                        <Typography component="h3" variant="h3">Education and Experience Requirements</Typography>
                        <ul>
                            <li>Education: <strong><EducationalRequirements
                                value={educationalRequirements || 'No Requirements'}/></strong></li>
                            {!!experienceRequirements && (
                                <li>Experience: <strong>{experienceRequirements} Months</strong></li>)}
                            {experienceInPlaceOfEducation && (
                                <li>Allow Experience in place of education:{' '}<strong>Yes</strong></li>)}
                        </ul>
                    </section>
                    <section>
                        <Typography component="h3" variant="h3">How to Apply</Typography>
                        {!!filename && (
                            <Link href={`https://intranet.chums.com/pdf/jobs/${filename}`} target="_blank">
                                Download Job Description
                            </Link>
                        )}
                        <div>Email your resume to <Link
                            href={`mailto:jobs@chums.com?subject=${encodeURIComponent(title)}`}
                            target="_blank">jobs@chums.com</Link></div>
                    </section>
                    <small>Last Updated: {new Date(timestamp).toLocaleString()}</small>
                </Box>
            </Paper>
        </ErrorBoundary>
    )
}
export default JobPostingRender;
