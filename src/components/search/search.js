import React from "react";
import { useDispatch } from "react-redux";
import './search.css';
import { search } from "../../features/reddit/redditSlice";

export default function Search(){
    const dispatch = useDispatch();

    const handleEnter = (elem) => {
        if(elem.key === "Enter" && elem.target.value.length > 0){
            dispatch(search(elem.target.value));
        }
    }

    return (
        <input type="text" placeholder="Search" onKeyDown={(elem) => handleEnter(elem)}/>
    );
}