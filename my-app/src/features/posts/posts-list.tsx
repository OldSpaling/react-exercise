import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import PostAuthor from './post-author';
import { selectAllPosts } from './post-slice';
import CSSModule from './posts-list.module.css';
import { ReactionButtons } from './reaction-buttons';
import { TimeAgo } from './time-age';
export const PostList = () => {
    const posts = useAppSelector(selectAllPosts);
    //! 在slice之外不能修改状态数据,slice copy一份
    const renderedPosts = posts.slice().sort((a, b) => {
        return a.date > b.date ? -1 : 1;
    }).map((post) => {
        return <article className='post-excerpt' key={post.id}>
            <h3>
                <span>{post.title}</span>
                <span className="actions">
                    <NavLink to={`/post/${post.id}`}>View </NavLink>
                    <NavLink to={`/post/edit/${post.id}`}>Edit</NavLink>
                </span>
            </h3>
            <p className='post-content'>{post.content.substring(0, 100)}</p>
            <div>
                <PostAuthor userId={post.authorId}></PostAuthor>&nbsp;
                <TimeAgo timestamp={post.date}></TimeAgo>
                <ReactionButtons post={post}></ReactionButtons>
            </div>

        </article>
    });
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