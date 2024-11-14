

import { baseApi } from "../../baseApi";

const postsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        posts: builder.query({
            query: ({categories, page}) => ({
                url: `/posts?categories=${categories}&page=${page}`,
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
        }),

        editPost: builder.mutation({
            query: (data) => ({
                url: `/posts/${data.postId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Posts'],
        }),

        deletePost: builder.mutation({
            query: (postId) => ({
                url: `/posts/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Posts'],
        }),
    })
})


export const { usePostsQuery, useCreatePostMutation, useGetPostsByUserQuery, useEditPostMutation, useDeletePostMutation } = postsApi;