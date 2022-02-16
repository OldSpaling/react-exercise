import { ActionCreatorWithPayload, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
type PostSliceState = { id: string, title: string, content: string,authorId:string,date:string };
const initialState:PostSliceState[] = [
    { id: '1', title: "FirstPost!", content: 'Hello!',authorId:"0",date:new Date('2020-11-1').toISOString() },
    { id: "2", title: "Second Post!", content: "More text",authorId:"1" ,date:new Date('2022-2-15').toISOString()}
];
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer:(state,action)=>{
                state.push(action.payload)
            },
            prepare:(title:string,content:string,authorId:string)=>{
                //!准备负载的逻辑很复杂，但是多出调用，可以在此处处理
                return{
                    payload:{
                        id:nanoid(),
                        title,
                        content,
                        authorId,
                        date:new Date().toISOString()
                    },
                    meta:"",
                    error:""
                }
            }
        },
        //! action type: PayloadAction<PostSliceState>
        //! action 设置值后 actioncreator payload会自动有类型
        //Omit 去除date到处属性
        postUpdated: (state, action: PayloadAction<Omit<PostSliceState,'date'>>) => {
            const { id, title, content,authorId } = action.payload;
            const post=state.find(p=>p.id===id);
            if(post){
                Object.assign(post,{title,content,authorId,date:new Date().toISOString()});
            }
        }
    }
});
export default postSlice.reducer;
export const postAddedActionCreator = postSlice.actions.postAdded;// as ActionCreatorWithPayload<PostSliceState, string>;
//! action creator:ActionCreatorWithPayload<PostSliceState, string>
export const postUpdatedActionCreator = postSlice.actions.postUpdated //as ActionCreatorWithPayload<Omit<PostSliceState,'date'>, string>;