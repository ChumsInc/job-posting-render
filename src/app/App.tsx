import React, {useEffect} from 'react';
import {loadJobPostings} from "../ducks/jobs/actions";
import JobPostingsList from "../ducks/jobs/JobPostingsList";
import {useAppDispatch} from "./configureStore";
import {LoadJobPosting} from "../ducks/jobs/types";
import {Alert} from "chums-components";
import AlertList from "../ducks/alerts/AlertList";


const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const params = new URLSearchParams(window.location.search);
    const arg: LoadJobPosting = {
        id: params.get('id') ?? undefined,
        preview: params.get('preview') === '1',
    }

    useEffect(() => {
        dispatch(loadJobPostings(arg))
    }, [])

    return (
        <div>
            <AlertList/>
            {arg.preview && (
                <Alert color="warning" title='Job Posting Preview'>
                    This is just a preview and could possibly have errors or is not a live posting.
                </Alert>
            )}
            <JobPostingsList/>
        </div>
    )
}

export default App;
