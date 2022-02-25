import { unwrapResult } from '@reduxjs/toolkit';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { client } from '../../api/client';
import { useAppSelector } from '../../app/store';
import { addNewPost, RequestStatus } from './post-slice';
export const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState(RequestStatus.Idle);
    //dispatch
    const dispatch = useDispatch();
    //navigate
    const navigate = useNavigate();
    //selector
    const users = useAppSelector(state => state.users);
    //event
    //!ReactEventHandler
    const onTitleChanged: ChangeEventHandler<HTMLInputElement> = (e) => setTitle(e.target.value);
    const onContentChanged: ChangeEventHandler<HTMLTextAreaElement> = e => setContent(e.target.value);
    const onAuthorChanged: ChangeEventHandler<HTMLSelectElement> = e => setAuthorId(e.target.value);
    const canSave = Boolean(title && content && authorId && addRequestStatus === RequestStatus.Idle);
    const userOptions = users.map((user, i) => {
        return (<option value={user.id} key={user.id} >{user.name}</option>);
    });
    useEffect(()=>{
        users.length>0&&setAuthorId(users[1].id)
    },[users])//!第二个参数是检测变量变化，之后变化才会触发回调逻辑


    // }, [users]);//!第二个参数是检测变量变化，之后变化才会触发回调逻辑
    //submit
    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus(RequestStatus.Loading);
                const resultAction = await dispatch(addNewPost({ title, content, user: authorId }));
                unwrapResult(resultAction as any);
                // dispatch(postAdded(title,content,authorId))
                setTitle('');
                setContent('');
                setAuthorId('');
                // navigate('/post');
            } catch (err) {
                console.log("Failed to save the post:", err);
            } finally {
                setAddRequestStatus(RequestStatus.Idle);
            }

        }
    };
    return (
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
                <select id="post-author" onChange={onAuthorChanged}value={authorId}>
                    {userOptions}
                </select>
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>保存帖子</button>
            </form>
        </section>
    );
};