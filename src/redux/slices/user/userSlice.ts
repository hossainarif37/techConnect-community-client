import { IUser } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser = {
    isAuthenticated: false,
    user: null,
}


export const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload.user;
            state.isAuthenticated = payload.isAuthenticated;
        },
        removeUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    }
})


export const { setUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;