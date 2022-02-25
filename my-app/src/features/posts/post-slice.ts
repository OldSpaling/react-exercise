import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { RootState } from '../../app/store';
export const reactionEmojis = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}
export type PostModel = { id: string, title: string, content: string, user: string, date: string, reactions: { [key in keyof typeof reactionEmojis]: number } }
export enum RequestStatus {
    Idle = 'idle',
    Loading = 'loading',
    Succeeded = 'succeeded',
    Failed = 'failed'
}
type PostState = {
    posts: PostModel[],
    status: RequestStatus,
    error?: string
};
const initialState: PostState = {
    posts: [],
    status: RequestStatus.Idle,
    // error: null
};
//! createAsyncThunk @param1 生产action类型的前缀字符串，@param2 payload creator 回调函数，返回promise
export const featcPosts = createAsyncThunk('post/fetchPosts', async () => {
    const response = await client.get("/fakeApi/posts");
    //response.posts
    console.log(response)
    return response.data;
});
export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost: Partial<PostModel>) => {
    const response = await client.post('/fakeApi/posts', initialPost);
    console.log(response)
    return response.data;
})
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // postAdded: {
        //     reducer: (state, action) => {
        //         state.posts.push(action.payload)
        //     },
        //     prepare: (title: string, content: string, authorId: string) => {
        //         //!准备负载的逻辑很复杂，但是多处调用，可以在此处处理
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 content,
        //                 user:authorId,
        //                 date: new Date().toISOString(),
        //                 reactions: {
        //                     thumbsUp: 0,
        //                     hooray: 0,
        //                     heart: 0,
        //                     rocket: 0,
        //                     eyes: 0
        //                 }
        //             } as PostState,
        //             meta: "",
        //             error: ""
        //         }
        //         // return { payload: "", meta: "", error: '' };
        //     }
        // },
        //! action type: PayloadAction<PostSliceState>
        //! action 设置值后 actioncreator payload会自动有类型
        //Omit 去除date到处属性
        postUpdated: (state, action: PayloadAction<Omit<PostModel, 'date' | 'reactions'>>) => {
            const { id, title, content, user } = action.payload;
            const post = state.posts.find(p => p.id === id);
            if (post) {
                Object.assign(post, { title, content, user, date: new Date().toISOString() });
            }
        },
        reactionAdded: (state, action: PayloadAction<{ postId: string, reaction: keyof typeof reactionEmojis }>) => {
            const { postId, reaction } = action.payload;
            const post = state.posts.find(s => s.id === postId);
            if (post) {
                post.reactions[reaction]++;
            }

        }
    },
    //!有时切片的 reducer 需要响应 没有 定义到该切片的 reducers 字段中的 action。这个时候就需要使用 slice 中的 extraReducers 字段
    /**!
     * ts 应该用此结构便于传递原型 extraReducers: builder => {
    builder.addCase('counter/decrement', (state, action) => {})
    builder.addCase(increment, (state, action) => {})
  }
     */
    // extraReducers: {
    //     [featcPosts.pending.toString()]: (state, action) => {
    //         state.status = RequestStatus.Loading;
    //     },
    //     [featcPosts.fulfilled.toString()]: (state, action) => {
    //         state.status = RequestStatus.Succeeded;
    //         state.posts = state.posts.concat(action.payload);
    //     },
    //     [featcPosts.rejected.toString()]: (state, action) => {
    //         state.status = RequestStatus.Failed;
    //         state.error = action.error.message;
    //     },
    //     [addNewPost.fulfilled.toString()]: (state, action) => {
    //         state.posts.push(action.payload);
    //     }
    // }
    extraReducers:builder=>{
        builder
        .addCase(featcPosts.pending,(state,action)=>{
            state.status=RequestStatus.Loading;
        })
        .addCase(featcPosts.fulfilled,(state,action)=>{
            state.status=RequestStatus.Succeeded;
            state.posts=state.posts.concat(action.payload);
        })
        .addCase(featcPosts.rejected,(state,action)=>{
            state.status=RequestStatus.Failed;
            state.error=action.error.message;
        })
        .addCase(addNewPost.fulfilled,(state,action)=>{
            state.posts.push(action.payload);
        })
    }
});

export default postSlice.reducer;
// export const postAddedActionCreator = postSlice.actions.postAdded;// as ActionCreatorWithPayload<PostSliceState, string>;
//! action creator:ActionCreatorWithPayload<PostSliceState, string>
export const { postUpdated, reactionAdded } = postSlice.actions //as ActionCreatorWithPayload<Omit<PostSliceState,'date'>, string>;
//! 设置可重用贴片代码，开始不要用，只有重复多次使用的才这么写
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostById = (state: RootState, postId: string) => state.posts.posts.find(p => p.id === postId);
export type PostSliceState = PostState;