import React from "react";
import {EmploymentTypes, JobPosting} from "../ducks/jobs";
import {default as JobLocation, jobLocationLD} from "./JobLocation";
import JobDate from "./JobDate";
import EducationalRequirements from "./EducationalRequirements";
import ErrorBoundary from "chums-ducks/dist/components/ErrorBoundary";

interface JobPostingProps {
    posting: JobPosting
}

const JobPostingRender: React.FC<JobPostingProps> = ({posting}) => {
    const {
        id,
        title,
        jobLocation,
        datePosted,
        employmentType,
        description,
        validThrough,
        educationalRequirements,
        experienceRequirements,
        experienceInPlaceOfEducation,
        filename
    } = posting;

    const ldJSON: object = {
        "@context": 'https://schema.org/',
        '@type': 'JobPosting',
        title,
        description,
        hiringOrganization: {
            "@type": 'Organization',
            name: 'Chums, Inc',
            sameAs: 'https://chums.com',
            logo: "https://intranet.chums.com/images/chums-logo-badge-400px.png",
        },
        datePosted,
        validThrough,
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                ...jobLocationLD(jobLocation),
            }
        },
        employmentType,
        educationalRequirements,
        experienceRequirements: {
            monthsOfExperience: experienceRequirements,
        },
        experienceInPlaceOfEducation,
    }

    return (
        <ErrorBoundary>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(ldJSON)}}/>
            <section vocab="https://schema.org" typeof="JobPosting" className="job-opening" id={'job-posting--' + id}>
                <h2 property="title" className="job-opening--title">{title}</h2>
                <meta property="specialCommitments" content="VeteranCommit"/>
                <section>
                    <h3>Location</h3>
                    <JobLocation location={jobLocation}/>
                </section>
                <section>
                    <h3>Date Posted</h3>
                    <div>
                        <JobDate date={datePosted} schemaTag='datePosted'/>
                    </div>
                </section>
                <section>
                    <h3>Employment Type</h3>
                    <div property="employmentType">
                        {EmploymentTypes[employmentType]}
                    </div>
                </section>
                <section className="job-opening--description">
                    <h3>Description</h3>
                    <div property="description" dangerouslySetInnerHTML={{__html: description}}/>
                </section>
                <section>
                    <h3>Education and Experience Requirements</h3>
                    <ul>
                        <li>Education: <strong><EducationalRequirements value={educationalRequirements || 'No Requirements'} /></strong></li>
                        {!!experienceRequirements && (<li>Experience: <strong>{experienceRequirements} Months</strong></li>)}
                        {experienceInPlaceOfEducation && (<li>Allow Experience in place of education:{' '}<strong>Yes</strong></li>)}
                    </ul>
                </section>
                <section>
                    <h3>How to Apply</h3>
                    <a href={`https://intranet.chums.com/pdf/jobs/${filename}`} target="_blank">Download Job Description</a>
                    <div>Email your resume to <a href={`mailto:jobs@chums.com?subject=${encodeURIComponent(title)}`} target="_blank">jobs@chums.com</a></div>
                </section>
            </section>
        </ErrorBoundary>
    )
}
export default JobPostingRender;
