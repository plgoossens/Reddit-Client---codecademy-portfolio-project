import React from "react";
import './post.css';
import arrow from '../../assets/arrow-up.png';
import commentImg from '../../assets/commenter.png';

export default function Post(){

    return (
        <div className="post">
            <div className="leftbar">
                <img src={arrow} alt="up arrow" className="arrow up"/>
                <span className="likes">10k</span>
                <img src={arrow} alt="down arrow" className="arrow down"/>
            </div>
            <div className="maincontent">
                <h2 className="postTitle">Carpenter hides a newspaper and bottle of whiskey in the wall for someone to find decades later.</h2>
                <img src="https://i.redd.it/fh1qol1ep2z91.jpg" alt="img" className="postImg"/>
                <div className="greenline"/>
                <div className="postInfos">
                    <span className="postAuthor">theadum</span>
                    <span className="postTime">12 hours ago</span>
                    <span className="postComments">
                        <img src={commentImg} alt="comment" className="commentsImg"/>
                        1.8k
                    </span>
                </div>
            </div>
        </div>
    );
}