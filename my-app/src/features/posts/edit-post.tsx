import React, { ChangeEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/store';
import { postUpdated, selectPostById } from './post-slice';
export const EditPost = () => {
    const { postId } = useParams();
    const post = useAppSelector(state =>selectPostById(state,postId as string));
    const users=useAppSelector(state=>state.users);
    const [title, setTitle] = useState(post?.title||'');
    const [content, setContent] = useState(post?.content||'');
    const[authorId,setAuthorId]=useState(post?.authorId||'');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onTitleChanged: ChangeEventHandler<HTMLInputElement> = e => setTitle(e.target.value);
    const onContentChanged: ChangeEventHandler<HTMLTextAreaElement> = e => setContent(e.target.value);
    const onSelectChanged:ChangeEventHandler<HTMLSelectElement>=e=>setAuthorId(e.target.value);
    const canSave=Boolean(title&&content&&postId&&authorId);
    const userOptions=users.map(u=>(
        <option value={u.id} key={u.id}>{u.name}</option>
    ));
    const onSavePostClicked = () => {
        if (canSave) {
            dispatch(postUpdated({
                id: postId||'',
                title,
                content,
                authorId
            }))
            navigate(`/post`);
        }
    }
    return (
        <section>
            <h2>编辑</h2>
            <form>
                <label htmlFor="title">标题：</label>
                <input id="title" type="text" value={title} onChange={onTitleChanged}/>
                <label htmlFor="content">内容：</label>
                <textarea name="" id="content"value={content}onChange={onContentChanged}></textarea>
                <label htmlFor="post-author">作者：</label>
                <select name="" id="post-author" onChange={onSelectChanged} value={authorId}>
                    {userOptions}
                </select>
                <button onClick={onSavePostClicked} disabled={!canSave}>提交</button>
            </form>
        </section>
    );
}