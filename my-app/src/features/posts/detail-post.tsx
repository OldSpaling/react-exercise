import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import PostAuthor from './post-author';
import { selectPostById } from './post-slice';
import { ReactionButtons } from './reaction-buttons';
import { TimeAgo } from './time-age';
export const PostDetail=()=>{
    const {postId}=useParams();
    const post=useAppSelector(state=>selectPostById(state,postId as string));
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