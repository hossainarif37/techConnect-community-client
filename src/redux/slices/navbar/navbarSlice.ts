import { INavbar } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit"

const initialState: INavbar = {
    isNavToggle: false,
}


const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        toggleNav: (state) => {
            state.isNavToggle = !state.isNavToggle
        },
    },
})


export const { toggleNav } = navbarSlice.actions;

export default navbarSlice.reducer;