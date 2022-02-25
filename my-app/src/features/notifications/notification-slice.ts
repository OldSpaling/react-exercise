import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNotifications=createAsyncThunk("notifications/fetchNotifications",async(_,{getState})=>{
    const allNotifications=selectAllNotifications(getState());
    const [latestNotification]=allNotifications;
    const latestTimestamp=latestNotification?latestNotification.date:'';
});
const notificationsSlice=createSlice({
    name:"notifications",
    initialState:[],
    reducers:{},
    extraReducers:(builder)=>{
        
    }
})
export const selectAllNotifications=(state)=>state.notifications;