import {JobPosting} from "./types";
import {fetchJSON} from "@chumsinc/ui-utils";

export interface FetchJobPostingsProps {
    id?: number | string | null;
    preview?: boolean;
}

export async function fetchJobOpening(options: FetchJobPostingsProps = {}): Promise<JobPosting[]> {
    try {
        const params = new URLSearchParams();
        if (options.preview) {
            params.set('preview', '1');
        }
        const url = !!options.id
            ? `https://intranet.chums.com/api/timeclock/job-postings/active/:id.json?${params.toString()}`
                .replace(':id', encodeURIComponent(options.id))
                .replace(':preview', encodeURIComponent(options.id))
            : 'https://intranet.chums.com/api/timeclock/job-postings/active.json'
        ;
        const res = await fetchJSON<{ postings: JobPosting[] }>(url);
        return res?.postings ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchJobOpening()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchJobOpening()", err);
        return Promise.reject(new Error('Error in fetchJobOpening()'));
    }
}
