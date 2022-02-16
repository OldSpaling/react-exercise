import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import postsReducer from'../features/posts/post-slice';
import usersReducer from'../features/users/user-slice';
const store= configureStore({
    reducer:{
        posts:postsReducer,
        users:usersReducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store;