import {fetchJSON} from "chums-components";
import {JobPosting, LoadJobPosting} from "./types";

export const fetchJobsURL = (arg: LoadJobPosting) => {
    return `/api/timeclock/job-postings/active/${encodeURIComponent(String(arg.id || ''))}`
        + (arg.preview ? '?preview=1' : '');
}

export async function fetchJobPostings(arg: LoadJobPosting): Promise<JobPosting[]> {
    try {
        const url = fetchJobsURL(arg);
        const res = await fetchJSON<{postings: JobPosting[]}>(url, {cache: "no-cache"});
        return res?.postings ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchJobPostings()", err.message);
            return Promise.reject(err);
        }
        return Promise.reject(err);
    }
}
