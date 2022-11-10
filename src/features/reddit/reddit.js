import React, { useEffect } from "react";
import './reddit.css';
import Post from '../../components/post/post';
import { useDispatch, useSelector } from "react-redux";
import { loadPosts, selectPosts } from "./redditSlice";

export default function Reddit(){
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);

    useEffect(() => {
        dispatch(loadPosts("r/popular/"));
    }, [dispatch])

    return (
        <div className="reddit">
            {
                posts &&
                posts.map(post => <Post post={post}/>)
            }
        </div>
    );
}