import React from "react"
import { NavLink } from "react-router-dom";
import PostAuthor from "./post-author";
import { PostModel } from "./post-slice"
import { ReactionButtons } from "./reaction-buttons";
import { TimeAgo } from "./time-age";
export const PostExcerpt = (props: { post: PostModel }) => {
    const {post}=props;
    return (
        <article className='post-excerpt'>
            <h3>
                <span>{post.title}</span>
                <span className="actions">
                    <NavLink to={`/post/${post.id}`}>View </NavLink>
                    <NavLink to={`/post/edit/${post.id}`}>Edit</NavLink>
                </span>
            </h3>
            <p className='post-content'>{post.content.substring(0, 100)}</p>
            <div>
                <PostAuthor userId={post.user}></PostAuthor>&nbsp;
                <TimeAgo timestamp={post.date}></TimeAgo>
                <ReactionButtons post={post}></ReactionButtons>
            </div>

        </article>
    );
}