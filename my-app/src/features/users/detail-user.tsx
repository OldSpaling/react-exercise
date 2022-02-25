import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { selectAllPosts } from "../posts/post-slice";
import { selectUsersById } from "./user-slice";
export const UserDetail=()=>{
    const {userId}=useParams();
    const user=useAppSelector(state=>selectUsersById(state,userId as string));
    const postForUser=useAppSelector(state=>{
        const posts=selectAllPosts(state);
        return posts.filter(p=>p.user===userId);
    });
    const postTitles=postForUser.map(post=>(
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));
    return(
        <section>
            <h2>{user?.name}</h2>
            <ul>{postTitles}</ul>
        </section>
    );
};