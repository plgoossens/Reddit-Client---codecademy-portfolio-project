import React from "react";
import './post.css';
import arrow from '../../assets/arrow-up.png';
import commentImg from '../../assets/commenter.png';

const formatLikes = (score) => {
    if(score<1000) return score;
    else if(score < 100000){
        const num=score.toString();
        return Math.round(score/1000) + "." + num.slice(-3,-2);
    }
    else return Math.round(score/1000);
}

const formatDate = (creationDate) => {
    const seconds = Math.floor(Date.now()/1000 - creationDate);
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    const weeks = Math.floor(days/7);

    if(weeks>1) return weeks + " weeks ago";
    else if(weeks > 0) return weeks + " week ago";
    else if(days > 1) return days + " days ago";
    else if(days > 0) return days + " day ago";
    else if(hours > 1) return hours + " hours ago";
    else if(hours > 0) return hours + " hour ago";
    else if(minutes > 1) return minutes + " minutes ago";
    else if(minutes > 0) return minutes + " minute ago";
    else return seconds + " seconds ago";
}

export default function Post({post}){
    const title = post.data.title;
    const score = formatLikes(post.data.score);
    let img;
    if(post.data.url.startsWith("https://i.redd.it")){
        img = post.data.url;
    }
    const author = post.data.author;
    const creationDate = formatDate(post.data.created_utc);
    const comments = formatLikes(post.data.num_comments);

    return (
        <div className="post">
            <div className="leftbar">
                <img src={arrow} alt="up arrow" className="arrow up"/>
                <span className="likes">{score}k</span>
                <img src={arrow} alt="down arrow" className="arrow down"/>
            </div>
            <div className="maincontent">
                <h2 className="postTitle">{title}</h2>
                {img !== undefined &&
                <img src={img} alt="img" className="postImg"/>
                }
                <div className="greenline"/>
                <div className="postInfos">
                    <span className="postAuthor">{author}</span>
                    <span className="postTime">{creationDate}</span>
                    <span className="postComments">
                        <img src={commentImg} alt="comment" className="commentsImg"/>
                        {comments}k
                    </span>
                </div>
            </div>
        </div>
    );
}