import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    isLoading: false,
    isError: false
};

export const loadPosts = createAsyncThunk(
    'reddit/loadPosts',
    async (url) => {
        url = url.slice(0, url.length-1);
        const reddit = await fetch(`https://www.reddit.com/${url}.json`);
        const redditJSON = await reddit.json();
        return redditJSON.data.children;
    }
);

const redditSlice = createSlice({
    name: 'reddit',
    initialState: initialState,
    reducers : {
        
    },
    extraReducers : {
        [loadPosts.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = action.payload;
        },
        [loadPosts.pending]: (state,action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [loadPosts.rejected]: (state,action) => {
            state.isLoading = false;
            state.isError = true;
        }
    }
});

export const selectPosts = (state) => state.reddit.posts;
export default redditSlice.reducer;