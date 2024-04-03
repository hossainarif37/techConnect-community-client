

import { baseApi } from "../../baseApi";

const postsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        posts: builder.query({
            query: () => ({
                url: '/posts',
                method: 'GET',
            }),
            providesTags: ['Posts'],
        }),

        createPost: builder.mutation({
            query: (data) => ({
                url: '/posts',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Posts'],
        })
    })
})


export const { usePostsQuery, useCreatePostMutation } = postsApi;