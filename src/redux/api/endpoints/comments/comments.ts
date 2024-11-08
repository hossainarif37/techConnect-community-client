// redux/api/endpoints/comments/comments.js

import { baseApi } from "../../baseApi";

const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommentsByPostId: builder.query({
            query: ({ postId, skip = 1, limit = 10 }) => ({
                url: `/comments/${postId}?skip=${skip}&limit=${limit}`,
                method: 'GET'
            }),
            providesTags: (result, error, arg) => [
                { type: 'Comments', id: arg.postId }
            ],
        }),
        
        createComment: builder.mutation({
            query: (data) => ({
                url: '/comments',
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Comments', id: arg.article } // 'article' represents postId
            ],
        }),

        editComment: builder.mutation({
            query: (data) => ({
                url: `/comments/${data.commentId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Comments', id: arg.postId } // Ensure 'postId' is part of the arg
            ],
        }),

        deleteComment: builder.mutation({
            query: ({commentId, articleId}) => ({
                url: `/comments/${commentId}/${articleId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Comments', id: arg.postId } // Ensure 'postId' is part of the arg
            ],
        }),
    })
});

export const { useGetCommentsByPostIdQuery, useLazyGetCommentsByPostIdQuery, useCreateCommentMutation, useEditCommentMutation, useDeleteCommentMutation } = commentApi;
