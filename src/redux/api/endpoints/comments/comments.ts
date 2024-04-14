import { baseApi } from "../../baseApi";

const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommentsByPostId: builder.query({
            query: ({ postId, skip }) => ({
                url: skip ? `/comments/${postId}?skip=${skip}` : `/comments/${postId}`,
                method: 'GET'
            })
        })
    })
})

export const { useGetCommentsByPostIdQuery, useLazyGetCommentsByPostIdQuery } = commentApi;