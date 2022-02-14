import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import postsReducer from'../features/posts/post-slice';
const store= configureStore({
    reducer:{
        posts:postsReducer
    }
});
 type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store;