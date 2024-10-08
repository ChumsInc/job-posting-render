import React from "react";
import {useSelector} from "react-redux";
import {Alert} from "chums-components";
import JobPostingRender from "../../components/JobPostingRender";
import JobPostingLink from "../../components/JobPostingLink";
import {selectList, selectLoading} from "./selectors";

const JobPostingsList: React.FC = () => {
    const loading = useSelector(selectLoading);
    const list = useSelector(selectList);

    return (
        <div className="job-openings">
            {!loading && list.length === 0 && (
                <Alert color="secondary">
                    <h2 className="alert-heading">Current Career Openings</h2>
                    <p>
                        There are currently no positions listed at the moment. Please check back frequently and feel
                        free to email your up-to-date resume and cover letter to:{' '}
                        <a href="mailto:jobs@chums.com">jobs@chums.com</a>.
                    </p>
                </Alert>
            )}
            {!!list.length && <h2>Current Career Openings</h2>}
            {!!list.length && (
                <ul className="job-openings--list">
                    {list.map(posting => (
                        <JobPostingLink key={posting.id} {...posting} />
                    ))}
                </ul>
            )}
            {list.map(posting => (
                <JobPostingRender key={posting.id} posting={posting}/>
            ))}
        </div>
    )
}

export default JobPostingsList;
