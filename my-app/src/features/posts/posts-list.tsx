import React from 'react';
import { NavLink } from 'react-router-dom';
import { RootState, useAppSelector } from '../../app/store';
import './posts-list.module.css';
export const PostList=()=>{
    const posts=useAppSelector((state:RootState)=>{
        return state.posts;
    });
    const renderedPosts=posts.map((post)=>{
        return <article className='post-excerpt'key={post.id}>
            <h3>{post.title}</h3>
            <p className='post-content'>{post.content.substring(0,100)}</p>
        </article>
    });
    return(
        <section className='posts-list'>
            <h2>Posts</h2>
            <div className="actions">
                <NavLink to="/list/add">Add</NavLink>
            </div>
            {renderedPosts}
        </section>
    );
};