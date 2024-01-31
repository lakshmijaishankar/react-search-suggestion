import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type UserListData = {
    loading: boolean;
    userData: Array<{}>;
    error: string | any
}

const userListData: UserListData = {
    loading: false,
    userData: [],
    error: ""
}


export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    return (await (axios.get("https://dummyjson.com/users"))).data
})

const userSlice = createSlice({
    name: "user",
    initialState: userListData,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload.users;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.stack
        })
    }
})

export default userSlice.reducer;
