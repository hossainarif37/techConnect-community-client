import { baseApi } from "../../baseApi";

const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommentsByPostId: builder.query({
            query: ({ postId, skip }) => ({
                url: skip ? `/comments/${postId}?skip=${skip}` : `/comments/${postId}`,
                method: 'GET'
            })
        }),

        createComment: builder.mutation({
            query: (data) => ({
                url: '/comments',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useGetCommentsByPostIdQuery, useLazyGetCommentsByPostIdQuery, useCreateCommentMutation } = commentApi;