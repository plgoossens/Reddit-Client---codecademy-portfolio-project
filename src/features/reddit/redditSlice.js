import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    isLoading: false,
    isError: false,
    isLoadingComments: false,
    isErrorComments: false
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

export const search = createAsyncThunk(
    'reddit/search',
    async (searchTerms) => {
        const search = searchTerms.replace(" ", "%20");
        const reddit = await fetch(`https://www.reddit.com/search.json?q=${search}`);
        const redditJSON = await reddit.json();
        return redditJSON.data.children;
    }
);

export const loadCommentsForPost = createAsyncThunk(
    'reddit/loadCommentsForPost',
    async ({postLink, postID}) => {
        postLink = postLink.slice(0, postLink.length-1);
        const reddit = await fetch(`https://www.reddit.com/${postLink}.json`);
        const redditJSON = await reddit.json();
        const comments= redditJSON[1].data.children;
        return {comments, postID};
    }
);

const redditSlice = createSlice({
    name: 'reddit',
    initialState: initialState,
    reducers : {
        toggleComments(state, action){
            state.posts.map(post => {
                if(post.data.id === action.payload){
                    post.data.showComments = !post.data.showComments;
                }
                return post;
            });
        }
    },
    extraReducers : {
        [loadPosts.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = action.payload;
            for(const post of state.posts) {
                post.data = {...post.data, showComments: true};
            }
        },
        [loadPosts.pending]: (state,action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [loadPosts.rejected]: (state,action) => {
            state.isLoading = false;
            state.isError = true;
        },
        [search.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.posts = action.payload;
        },
        [search.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [search.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
        },
        [loadCommentsForPost.fulfilled] : (state, action) => {
            state.isLoadingComments = false;
            state.isErrorComments = false;
            const {comments, postID} = action.payload;
            state.posts.map(post => {
                if(post.data.id === postID){
                    post.data.comments = comments;
                }
                return post;
            });
        },
        [loadCommentsForPost.pending] : (state, action) => {
            state.isLoadingComments = true;
            state.isErrorComments = false;
        },
        [loadCommentsForPost.rejected] : (state, action) => {
            state.isLoadingComments = false;
            state.isErrorComments = true;
        }
    }
});

export const selectShowComments = postID => state => {
    for(const post of state.reddit.posts){
        if(post.data.id === postID){
            return post.data.showComments;
        }
    }
};
export const selectPosts = (state) => state.reddit.posts;
export const {toggleComments} = redditSlice.actions;
export default redditSlice.reducer;