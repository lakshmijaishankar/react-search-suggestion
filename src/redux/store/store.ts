import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import searchUserSlice from "../slice/searchUserSlice";
import breadCrumbsSlice from '../slice/breadCrumbsSlice'

export const store = configureStore({
    reducer: {
        userStore: userSlice,
        searchStore: searchUserSlice,
        breadcrumbsStore: breadCrumbsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;