import {createReducer} from "@reduxjs/toolkit";
import {jobPostingsSorter, loadJobPostings} from "./actions";
import {JobPosting} from "./types";

export interface JobState {
    list: JobPosting[],
    loading: boolean,
}

const initialJobState: JobState = {
    list: [],
    loading: false,
}

const listReducer = (state: JobPosting[] = initialJobState.list, action: JobPostingsAction) => {
    const {type, payload} = action;
    switch (type) {
    case fetchJobsSucceeded:
        return payload || [];
    default:
        return state;
    }
}

export default jobsReducer;
