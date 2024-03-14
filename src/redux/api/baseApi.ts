import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Cookies from "js-cookie"


export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1',
        prepareHeaders: (headers, { getState }) => {
            // Retrieve the token from the cookie
            const token = Cookies.get('authToken');
            console.log('again');
            if (token) {
                headers.set('authorization', token);
            }
            return headers;
        },
    }),
    endpoints: () => ({})
})