import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import PostAuthor from './post-author';
import { ReactionButtons } from './reaction-buttons';
import { TimeAgo } from './time-age';
export const PostDetail=()=>{
    const {postId}=useParams();
    const post=useAppSelector(state=>state.posts.find(post=>post.id===postId));
    if(!post){
        return(
            <section>
                <h2>页面未找到！</h2>
            </section>
        );
    }
    return(
        <section>
            <article className='post'>
                <h2>{post.title}</h2>
                <p className='post-content'>{post.content}</p>
                <PostAuthor userId={post.authorId}></PostAuthor>&nbsp;
                <TimeAgo timestamp={post.date}></TimeAgo>
                <ReactionButtons post={post}></ReactionButtons>
            </article>
        </section>
    );
}