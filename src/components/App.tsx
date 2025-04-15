import React, {useEffect} from 'react';
import {Alert, AlertList} from "chums-ducks";
import JobPostingsList from "../ducks/jobs/JobPostingsList";
import {useDispatch} from "react-redux";
import {loadJobPostings} from "../ducks/jobs";
import './job-openings.css';
import {parse as parseQuery} from "query-string";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const query = parseQuery(location.search);

    console.log(query);
    const id = Number(query.id);
    const preview = !!query.preview;

    console.log({id, preview});

    useEffect(() => {
        if (id) {
            dispatch(loadJobPostings(id, preview));
        } else {
            dispatch(loadJobPostings());
        }
    }, [])

    return (
        <div>
            <AlertList/>
            {preview && (
                <Alert color="warning" title='Job Posting Preview'>
                    This is just a preview and could possibly have errors or is not a live posting.
                </Alert>
            )}
            <JobPostingsList/>
        </div>
    )
}

export default App;
