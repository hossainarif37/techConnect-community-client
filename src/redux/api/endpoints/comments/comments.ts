import { baseApi } from "../../baseApi";

const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommentsByPostId: builder.query({
            query: ({ postId, skip = 0, limit = 10 }) => ({
                url: `/comments/${postId}?skip=${skip}&limit=${limit}`,
                method: 'GET'
            }),

            providesTags: ['Comments'],
        }),
        

        createComment: builder.mutation({
            query: (data) => ({
                url: '/comments',
                method: 'POST',
                body: data
            })
        }),


        editComment: builder.mutation({
            query: (data) => ({
                url: `/comments/${data.commentId}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ['Posts', 'Comments']
        }),
    })
})

export const { useGetCommentsByPostIdQuery, useLazyGetCommentsByPostIdQuery, useCreateCommentMutation } = commentApi;