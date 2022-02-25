import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
export type UserState = {
    id: string;
    name: string;
}
const initialState: UserState[] = [];
export const fetchUsers=createAsyncThunk("users/fetchUsers",async ()=>{
    const response=await client.get("/fakeApi/users");
    return response.data;
})
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers:builder=>{
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            return action.payload;
        })
    }
})
export default userSlice.reducer;
export const selectAllUsers=(state:RootState)=>state.users;
export const selectUsersById=(state:RootState,userId:string)=>state.users.find(user=>user.id===userId);