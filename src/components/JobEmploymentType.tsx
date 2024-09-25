import React from 'react';
import {ValidEmploymentType} from "../ducks/jobs/types";
import {employmentTypes} from "../ducks/jobs/constants";

interface JobEmploymentTypeProps {
    type: ValidEmploymentType,
}
const JobEmploymentType:React.FC<JobEmploymentTypeProps> = ({type}) => {
    return (
        <div>
            {employmentTypes[type]}
        </div>
    );
};

export default JobEmploymentType;
