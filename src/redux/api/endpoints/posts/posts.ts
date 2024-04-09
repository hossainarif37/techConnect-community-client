

import { baseApi } from "../../baseApi";

const postsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        posts: builder.query({
            query: (categories) => ({
                url: `/posts?categories=${categories}`,
                method: 'GET',
            }),
            providesTags: ['Posts'],
        }),

        getPostsByUser: builder.query({
            query: ({ userId, categories }) => {
                // Assuming your API supports filtering by categories through query parameters
                return ({
                    url: `/posts/${userId}?categories=${categories}`,
                    method: 'GET',
                })
            },
            providesTags: ['Posts']
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


export const { usePostsQuery, useCreatePostMutation, useGetPostsByUserQuery } = postsApi;