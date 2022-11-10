import { configureStore } from "@reduxjs/toolkit";
import redditSlice from "../features/reddit/redditSlice";
import subredditSlice from "../features/subreddit/subredditSlice";

export default configureStore({
    reducer: {
      subreddit: subredditSlice,
      reddit: redditSlice
    }
  });