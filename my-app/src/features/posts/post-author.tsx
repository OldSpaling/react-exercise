import React from "react";
import { useAppSelector } from "../../app/store";

const PostAuthor = (props: { userId: string }) => {
    const author = useAppSelector(state => state.users.find(u => u.id === props.userId));
    return <span>by {author?.name || 'Unknown author'}</span>

}
export default PostAuthor;