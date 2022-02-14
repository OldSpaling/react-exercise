import {createSlice} from'@reduxjs/toolkit';

const initialState=[
    {id:'1',title:"FirstPost!",content:'Hello!'},
    {id:"2",title:"Second Post!",content:"More text"}
];
const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{}
});
export default postSlice.reducer;