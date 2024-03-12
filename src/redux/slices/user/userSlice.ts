import { IUser } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser = {
    _id: "",
    name: "",
    email: "",
    profilePicture: "",
    followers: [],
    following: [],
    articles: [],
    savedArticles: [],
}


export const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    }
})


export default usersSlice.reducer;