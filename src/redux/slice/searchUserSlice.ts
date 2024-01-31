import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type SearchUserData = {
    loding: boolean;
    searchUserList: UserObjectKey[]
    error: string | any;
    noUserFound?: string
}

export type UserObjectKey = {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
}
const searchUserList: SearchUserData = {
    loding: false,
    searchUserList: [],
    error: "",
    noUserFound: ""
}

export const fetchSearchUserList = createAsyncThunk("user/fetchSearchUser", async (name: string) => {
    return (await axios.get(`/users/search`, { baseURL: "https://dummyjson.com", params: { q: name } })).data
})

const searchUserSlice = createSlice({
    name: "user",
    initialState: searchUserList,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchSearchUserList.pending, state => {
            state.loding = true;
            state.noUserFound = "";
        });
        builder.addCase(fetchSearchUserList.fulfilled, (state, action) => {
            state.loding = false;
            if (action.payload.total === 0) {
                state.noUserFound = "No user Found try different name";
                state.searchUserList = action.payload.users
            } else {
                state.searchUserList = action.payload.users
                state.noUserFound = "";
            }
        });
        builder.addCase(fetchSearchUserList.rejected, (state, action) => {
            state.loding = false;
            state.error = action.error.code
        })
    },
})

export default searchUserSlice.reducer;
