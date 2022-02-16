import { nanoid } from '@reduxjs/toolkit';
import React, { ChangeEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postAdded } from './post-slice';
export const AddPostForm=()=>{
    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    //ReactEventHandler
    const onTitleChanged:ChangeEventHandler<HTMLInputElement>=(e)=>setTitle(e.target.value);
    const onContentChanged:ChangeEventHandler<HTMLTextAreaElement>=e=>setContent(e.target.value);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const onSavePostClicked=()=>{
        if(title&&content){
            dispatch(postAdded({
                id:nanoid(),
                title,
                content
            }))
            setTitle('');
            setContent('');
            navigate('/list');
        }
    };
    return(
        <section>
            <h2>添加新帖子</h2>
            <form>
                <label htmlFor="post-title">帖子标题：</label>
                <input 
                type="text" 
                id="post-title"
                name="postTitle"
                value={title}
                onChange={onTitleChanged}
                />
                <label htmlFor="post-content">内容：</label>
                <textarea name="postContent" id="post-content" value={content} onChange={onContentChanged}></textarea>
                <button type="button" onClick={onSavePostClicked}>保存帖子</button>
            </form>
        </section>
    );
};