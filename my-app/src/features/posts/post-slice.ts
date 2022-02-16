import {  ActionCreatorWithPayload, createSlice } from '@reduxjs/toolkit';
type PostSliceState={id:string,title:string,content:string};
const initialState= [
    { id: '1', title: "FirstPost!", content: 'Hello!' },
    { id: "2", title: "Second Post!", content: "More text" }
];
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: (state, action) => {
            state.push(action.payload);
        }
    }
});
export default postSlice.reducer;
export const postAdded= postSlice.actions.postAdded as ActionCreatorWithPayload<PostSliceState,string>;