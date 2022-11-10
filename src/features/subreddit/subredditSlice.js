import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    subreddits: [],
    isloading: false,
    isError: false
};

export const loadSubreddits = createAsyncThunk(
    'subreddit/loadSubreddits',
    async () => {
        const subreddits = await fetch('https://www.reddit.com/subreddits/popular.json');
        const subredditsJSON = await subreddits.json();
        return subredditsJSON.data.children;
    }
);

const subredditSlice = createSlice({
    name: 'subreddit',
    initialState: initialState,
    reducers : {
        
    },
    extraReducers : {
        [loadSubreddits.fulfilled] : (state, action) => {
            state.isloading = false;
            state.isError = false;
            state.subreddits = action.payload;
        },
        [loadSubreddits.pending] : (state, action) => {
            state.isloading = true;
            state.isError = false;
        },
        [loadSubreddits.rejected] : (state, action) => {
            state.isloading = false;
            state.isError = true;
        }
    }
});

export const selectSubreddits = (state) => state.subreddit.subreddits;
export default subredditSlice.reducer;