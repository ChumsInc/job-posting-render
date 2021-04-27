import {Action, combineReducers} from "redux";
import {ThunkAction} from "redux-thunk";
import {AlertAction, onErrorAction} from "chums-ducks";
import {RootState} from "../index";

export const fetchJobsRequested = 'app/jobs/fetch-requested';
export const fetchJobsSucceeded = 'app/jobs/fetch-succeeded';
export const fetchJobsFailed = 'app/jobs/fetch-failed';


export const fetchJobsURL = (id?: number, preview?: boolean) => {
    return `/api/timeclock/job-postings/active/${encodeURIComponent(String(id || ''))}`
        + (preview ? '?preview=1' : '');
}

export const selectList = (state: RootState) => state.jobs.list;
export const selectLoading = (state: RootState) => state.jobs.loading;


async function fetchJobPostings(id?: number, preview?: boolean) {
    try {
        const url = fetchJobsURL(id, preview);
        const res = await fetch(url);
        if (!res.ok) {
            return Promise.reject(new Error(`Status: ${res.status}; ${res.statusText}`));
        }
        const {postings} = await res.json();
        return postings;
    } catch (err) {
        console.debug("fetchJobPostings()", err.message);
        return Promise.reject(err);
    }
}

export const loadJobPostings = (id?: number, preview?: boolean): JobPostingThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            const loading = selectLoading(state);
            if (loading) {
                return;
            }
            dispatch({type: fetchJobsRequested});
            const postings = await fetchJobPostings(id, preview);
            dispatch({type: fetchJobsSucceeded, payload: postings});
        } catch (err) {
            dispatch({type: fetchJobsFailed});
            dispatch(onErrorAction(err, fetchJobsFailed));
        }
    }


export declare type ValidEmploymentType =
    'FULL_TIME'
    | 'PART_TIME'
    | 'CONTRACTOR'
    | 'TEMPORARY'
    | 'INTERN'
    | 'VOLUNTEER'
    | 'PER_DIEM'
    | 'OTHER';

export type EmploymentTypeMap = { [employmentType in ValidEmploymentType]: string }

export const EmploymentTypes: EmploymentTypeMap = {
    FULL_TIME: 'Full Time',
    PART_TIME: 'Part Time',
    CONTRACTOR: 'Contractor',
    TEMPORARY: 'Temporary',
    INTERN: 'Intern',
    VOLUNTEER: 'Volunteer',
    PER_DIEM: 'Per Diem',
    OTHER: 'Other',
}

export interface BaseSalary {
    value?: number,
    minValue?: number,
    maxValue?: number,
    unitText: string,
}

export interface JobPosting {
    id: number,
    title: string,
    enabled: boolean,
    description: string,
    datePosted: string,
    jobLocation: string,
    validThrough: string | null,
    baseSalary?: BaseSalary | null,
    employmentType: ValidEmploymentType,
    educationalRequirements: string,
    experienceRequirements: number
    experienceInPlaceOfEducation: boolean,
    filename: string,
    timestamp: string,
    changed?: boolean,
}

export interface JobPostingsAction extends Action {
    payload?: JobPosting[],
}

export interface JobPostingThunkAction extends ThunkAction<void, RootState, unknown, JobPostingsAction | AlertAction> {
}

interface JobState {
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

const loadingReducer = (state: boolean = initialJobState.loading, action: JobPostingsAction) => {
    switch (action.type) {
    case fetchJobsRequested:
        return true;
    case fetchJobsSucceeded:
    case fetchJobsFailed:
        return false;
    default:
        return state;
    }
}


export default combineReducers({
    list: listReducer,
    loading: loadingReducer,
})
