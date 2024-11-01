import { baseApi } from "../../baseApi";

const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommentsByPostId: builder.query({
            query: ({ postId, skip = 0, limit = 10 }) => ({
                url: `/comments/${postId}?skip=${skip}&limit=${limit}`,
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