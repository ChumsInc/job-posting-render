import React from 'react';
import {JobPosting} from "@/ducks/jobs/types";
import {jobLocationLD} from "@/components/JobLocation";

export interface JobPostingLDProps {
    posting: JobPosting;
}

export default function JobPostingLD({posting}: JobPostingLDProps) {
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
        emailRecipient,
        filename,
        applicationInstructions,
        timestamp
    } = posting;

    const ldJSON: any = {
        "@context": 'https://schema.org/',
        '@type': 'JobPosting',
        hiringOrganization: {
            "@type": 'Organization',
            name: 'Chums, Inc',
            sameAs: 'https://chums.com',
            logo: "https://intranet.chums.com/images/chums-logo-badge-400px.png",
        },
        title,
        specialCommitments: 'VeteranCommit, MilitarySpouseCommit',
        description,
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
        experienceInPlaceOfEducation,
    }

    if (!!experienceRequirements) {
        ldJSON.experienceRequirements = {
            monthsOfExperience: experienceRequirements,
        }
    }

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(ldJSON)}}/>
    )
}
