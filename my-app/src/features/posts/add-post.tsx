import React, { ChangeEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import { postAdded } from './post-slice';
export const AddPost=()=>{
    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const[authorId,setAuthorId]=useState('');
    //dispatch
    const dispatch=useDispatch();
    //navigate
    const navigate=useNavigate();
    //selector
    const users=useAppSelector(state=>state.users);
    //event
    //!ReactEventHandler
    const onTitleChanged:ChangeEventHandler<HTMLInputElement>=(e)=>setTitle(e.target.value);
    const onContentChanged:ChangeEventHandler<HTMLTextAreaElement>=e=>setContent(e.target.value);
    const onAuthorChanged:ChangeEventHandler<HTMLSelectElement>=e=>setAuthorId(e.target.value);
    const canSave=Boolean(title&&content&&authorId);
    const userOptions=users.map(user=>(
        <option value={user.id} key={user.id}>{user.name}</option>
    ));
    //submit
    const onSavePostClicked=()=>{
        if(canSave){
            dispatch(postAdded(title,content,authorId))
            setTitle('');
            setContent('');
            setAuthorId('');
            navigate('/post');
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
                <label htmlFor="post-author">作者：</label>
                <select id="post-author" onChange={onAuthorChanged}>
                    {userOptions}
                </select>
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>保存帖子</button>
            </form>
        </section>
    );
};