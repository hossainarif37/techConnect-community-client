import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user/userSlice'
import navbarSlice from './slices/navbar/navbarSlice'
import { baseApi } from './api/baseApi'

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        userSlice,
        navbarSlice
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch