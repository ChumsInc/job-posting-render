import {JobPosting} from "./types";
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {loadJobPostings} from "./actions";


const jobsAdapter = createEntityAdapter<JobPosting, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
});

const selectors = jobsAdapter.getSelectors();

export interface JobsState {
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    preview: boolean;
}

const initialState: JobsState = {
    preview: false,
    status: 'idle',
}

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: jobsAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadJobPostings.pending, (state, action) => {
                state.status = 'pending';
                state.preview = action.meta.arg.preview ?? false;
            })
            .addCase(loadJobPostings.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                jobsAdapter.setAll(state, action.payload);
            })
            .addCase(loadJobPostings.rejected, (state) => {
                state.status = 'rejected';
            })
    },
    selectors: {
        selectList: (state) => selectors.selectAll(state),
        selectStatus: (state) => state.status,
        selectPreview: (state) => state.preview,
    }
})

export const {selectList, selectStatus, selectPreview} = jobsSlice.selectors;

export default jobsSlice;
