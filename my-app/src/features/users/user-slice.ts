import { createSlice } from "@reduxjs/toolkit";
type UserState = {
    id: string;
    name: string;
}
const initialState: UserState[] = [
    { id: '0', name: 'Tianna Jenkins' },
    { id: '1', name: 'Kevin Grant' },
    { id: '2', name: 'Madison Price' }
]
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {}
})
export default userSlice.reducer;