import React from 'react';
import {EmploymentTypes, ValidEmploymentType} from "@/ducks/jobs/types";

interface JobEmploymentTypeProps {
    type: ValidEmploymentType,
}

const JobEmploymentType = ({type}: JobEmploymentTypeProps) => {
    return (
        <div>
            {EmploymentTypes[type]}
        </div>
    );
};

export default JobEmploymentType;
