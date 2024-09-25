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

const jobsReducer = createReducer(initialJobState, builder => {
    builder
        .addCase(loadJobPostings.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadJobPostings.fulfilled, (state, action) => {
            state.loading = false;
            state.list = [...action.payload].sort(jobPostingsSorter)
        })
        .addCase(loadJobPostings.rejected, (state) => {
            state.loading = false;
        })
})

export default jobsReducer;
