import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSubreddits, selectSubreddits } from './subredditSlice';
import './subreddit.css';
import logo from '../../assets/reddit-logo.png'
import { loadPosts } from "../reddit/redditSlice";

export default function Subreddit(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSubreddits());
    }, [dispatch]);

    const subreddits = useSelector(selectSubreddits);

    const handleClick = (url) => {
        dispatch(loadPosts(url));
    }

    return (
        <div className="subreddit">
            <h2 className="subredditTitle">Subreddits</h2>
            <ul>
            {subreddits.map(sub => {
                return <li className="subredditName" key={sub.data.display_name} onClick={()=>handleClick(sub.data.url)}>
                    {sub.data.icon_img&&
                        <img src={sub.data.icon_img} alt={sub.data.display_name} className='subredditImg'/>}
                    {!sub.data.icon_img &&
                        <img src={logo} alt={sub.data.display_name} className='subredditImg'/>
                    }
                    {sub.data.display_name}</li>
            }
            )}
            </ul>
        </div>
    );
}