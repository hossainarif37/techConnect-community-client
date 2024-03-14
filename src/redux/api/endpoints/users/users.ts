

import { baseApi } from "../../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            }),
        }),

        register: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body
            })
        }),

        currentUser: builder.query({
            query: () => ({
                url: '/user/current-user',
                method: 'GET',
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        })
    })
})


export const { useLoginMutation, useRegisterMutation, useCurrentUserQuery, useLazyCurrentUserQuery } = userApi;