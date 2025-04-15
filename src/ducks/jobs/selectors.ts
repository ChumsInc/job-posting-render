import {RootState} from "../../app/configureStore";

export const selectList = (state: RootState) => state.jobs.list;
export const selectLoading = (state: RootState) => state.jobs.loading;