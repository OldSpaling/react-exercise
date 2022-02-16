import { ActionCreatorWithPayload, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
export const reactionEmojis = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}
type PostState = { id: string, title: string, content: string, authorId: string, date: string, reactions: { [key in keyof typeof reactionEmojis]:number}  };
const initialState: PostState[] = [
    {
        id: '1', title: "FirstPost!", content: 'Hello!', authorId: "0", date: new Date('2020-11-1').toISOString(), reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes:0
        }
    },
    { id: "2", title: "Second Post!", content: "More text", authorId: "1", date: new Date('2022-2-15').toISOString(), reactions:{
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0
    } }
];
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: (title: string, content: string, authorId: string) => {
                //!准备负载的逻辑很复杂，但是多出调用，可以在此处处理
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        authorId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    } as PostState,
                    meta: "",
                    error: ""
                }
            }
        },
        //! action type: PayloadAction<PostSliceState>
        //! action 设置值后 actioncreator payload会自动有类型
        //Omit 去除date到处属性
        postUpdated: (state, action: PayloadAction<Omit<PostState, 'date' |'reactions'>>) => {
            const { id, title, content, authorId } = action.payload;
            const post = state.find(p => p.id === id);
            if (post) {
                Object.assign(post, { title, content, authorId, date: new Date().toISOString() });
            }
        },
        reactionAdded: (state, action: PayloadAction<{postId:string,reaction:keyof typeof reactionEmojis}>)=>{
            const { postId, reaction } = action.payload;
            const post = state.find(s => s.id === postId);
            if (post) {
                post.reactions[reaction]++;
            }

        }
    }
});
export default postSlice.reducer;
// export const postAddedActionCreator = postSlice.actions.postAdded;// as ActionCreatorWithPayload<PostSliceState, string>;
//! action creator:ActionCreatorWithPayload<PostSliceState, string>
export const { postUpdated, postAdded, reactionAdded } = postSlice.actions //as ActionCreatorWithPayload<Omit<PostSliceState,'date'>, string>;
export type PostSliceState = PostState;