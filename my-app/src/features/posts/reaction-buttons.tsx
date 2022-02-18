import React, { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { PostModel, PostSliceState, reactionAdded, reactionEmojis } from "./post-slice";

export const ReactionButtons = (props: { post: PostModel }) => {
  const dispatch=useDispatch()
  const onClick = (reaction:keyof typeof reactionEmojis) => {
    dispatch(reactionAdded({
      postId: props.post.id,
      reaction: reaction
    }))
  }
  const reactionButtons = Object.entries(reactionEmojis).map(([name, emoji]) => {
    const nameProp = name as keyof typeof reactionEmojis;
    return (
      <button key={name} type="button" className="muted-button reaction-button" onClick={() => { onClick(nameProp) }}>
        {emoji} {props.post.reactions[nameProp]}
      </button>
    );
  });
  return (
    <div>{reactionButtons}</div>
  );
}