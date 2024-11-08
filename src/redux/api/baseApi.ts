import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Cookies from "js-cookie"


export const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Posts', 'Comments'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            // Retrieve the token from the cookie
            const token = Cookies.get('authToken');
            if (token) {
                headers.set('authorization', token);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
})