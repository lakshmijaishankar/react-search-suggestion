import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserObjectKey } from "./searchUserSlice";

type BreadCrumbsState = {
    breadcrumbsItems: UserObjectKey[]
}

const breadCrumbsInitalState: BreadCrumbsState = {
    breadcrumbsItems: []
}
const breadCrumbsSlice = createSlice({
    name: "breadcrumbs",
    initialState: breadCrumbsInitalState,
    reducers: {
        addBreadcrumbs: (state, action: PayloadAction<UserObjectKey>) => {
            let isUserExist = state.breadcrumbsItems.some(user => user.id === action.payload.id)
            if (!isUserExist)
                state.breadcrumbsItems.push(action.payload)
        },
        removeBreadCrumbs: (state, action: PayloadAction<number>) => {
            state.breadcrumbsItems = state.breadcrumbsItems.filter(breadCrumbs => breadCrumbs.id !== action.payload)
        }
    }
})

export default breadCrumbsSlice.reducer;
export const { addBreadcrumbs, removeBreadCrumbs } = breadCrumbsSlice.actions