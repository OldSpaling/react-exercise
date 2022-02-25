import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import { PostExcerpt } from './excerpt-post';
import PostAuthor from './post-author';
import { featcPosts, RequestStatus, selectAllPosts } from './post-slice';
import CSSModule from './posts-list.module.css';
import { ReactionButtons } from './reaction-buttons';
import { TimeAgo } from './time-age';
export const PostList = () => {
    const posts = useAppSelector(selectAllPosts);
    const dispatch=useDispatch();
    const postStatus=useAppSelector(state=>state.posts.status);
    const error=useAppSelector(state=>state.posts.error);
    useEffect(()=>{
        if(postStatus==RequestStatus.Idle){
            dispatch(featcPosts());
        }
    },[postStatus,dispatch]);
    //! 在slice之外不能修改状态数据,slice copy一份
    let renderedPosts:JSX.Element|JSX.Element[]=<div></div>;
    if(postStatus==RequestStatus.Loading){
        renderedPosts=(<div className='loader'>Loading...</div>);
    }else if(postStatus===RequestStatus.Succeeded){
        renderedPosts = posts.slice().sort((a, b) => {
            return a.date > b.date ? -1 : 1;
        }).map((post) => {
            return (
                <PostExcerpt post={post}  key={post.id}/>
            )
        });
    }else if(postStatus===RequestStatus.Failed){
        renderedPosts=(<div>{error}</div>)
    }
     
    return (
        <section className='posts-list'>
            <h2>帖子列表</h2>
            <div className="actions">
                <NavLink to="/post/add">Add</NavLink>
            </div>
            {renderedPosts}
        </section>
    );
};