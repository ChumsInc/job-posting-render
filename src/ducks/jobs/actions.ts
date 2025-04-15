import {createAsyncThunk} from "@reduxjs/toolkit";
import {JobPosting} from "./types";
import {RootState} from "@/app/configureStore";
import {fetchJobOpening, FetchJobPostingsProps} from "./api";
import {selectStatus} from "@/ducks/jobs/index";

export const loadJobPostings = createAsyncThunk<JobPosting[], FetchJobPostingsProps, { state: RootState }>(
    'jobs/load',
    async (arg) => {
        return await fetchJobOpening(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectStatus(state) === 'idle';
        }
    }
)
