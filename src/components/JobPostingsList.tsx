import React from "react";
import {useSelector} from "react-redux";
import JobPostingRender from "./JobPostingRender";
import JobPostingLink from "./JobPostingLink";
import {JobPosting} from "@/ducks/jobs/types";
import {useAppSelector} from "@/app/configureStore";
import {selectList, selectPreview, selectStatus} from "@/ducks/jobs";
import styled from '@emotion/styled';
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const isLivePosting = ({enabled, datePosted, validThrough}: JobPosting): boolean => {
    const now = new Date();
    return enabled && !!datePosted && (!validThrough || new Date(validThrough) > now);
}

const JobOpeningsContainer = styled.div`
    letter-spacing: .025em;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeSpeed;
`
const JobPostingsList = () => {
    const preview = useAppSelector(selectPreview);
    const status = useAppSelector(selectStatus);
    const list = useSelector(selectList);

    return (
        <JobOpeningsContainer>
            <Typography component="h1" variant="h1" sx={{mb: 3}}>Current Career Openings</Typography>
            {status === 'pending' && (
                <div aria-busy="true">
                    <Typography variant="body1" component="h2">Loading current career openings</Typography>
                    <LinearProgress variant="indeterminate"/>
                </div>
            )}
            {status === 'fulfilled' && list.length === 0 && (
                <div aria-live="polite">
                    <Alert variant="standard" severity="info" icon={false}>
                        There are currently no positions listed at the moment. Please check back frequently and feel
                        free to email your up-to-date resume and cover letter to:{' '}
                        <a href="mailto:jobs@chums.com">jobs@chums.com</a>.
                    </Alert>
                </div>
            )}
            {status === 'fulfilled' && list.length > 0 && (
                <div aria-live="polite">
                    <ul>
                        {list.map(posting => (
                            <JobPostingLink key={posting.id} posting={posting}/>
                        ))}
                    </ul>
                    {list.map(posting => (
                        <JobPostingRender key={posting.id} posting={posting} preview={preview}
                                          isLive={isLivePosting(posting)}/>
                    ))}
                </div>
            )}
            <Alert variant="outlined" severity="info" icon={false} sx={{my: 3}}>
                <AlertTitle>Our commitment to Veterans and Military Spouses</AlertTitle>
                <p>At Chums we pledge our commitment to actively hire veterans of the U.S. Armed Forces and Military
                    Spouses.</p>
                <p>We value and recognize the leadership, training, character and discipline that our veterans and
                    members of the National Guard and Reserve bring to our company and the American workforce.</p>
            </Alert>
        </JobOpeningsContainer>
    )
}

export default JobPostingsList;
