import {selectLoading} from "./selectors";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {JobPosting, LoadJobPosting} from "./types";
import {fetchJobPostings} from "./api";
import {RootState} from "../../app/configureStore";

export const loadJobPostings = createAsyncThunk<JobPosting[], LoadJobPosting>(
    'jobs/load',
    async (arg) => {
        return fetchJobPostings(arg);
    }, {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !selectLoading(state);
        }
    }
)


export const jobPostingsSorter = (a:JobPosting, b:JobPosting) => {
    return a.id > b.id ? 1 : -1;
}