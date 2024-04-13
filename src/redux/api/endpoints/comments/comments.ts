

import { baseApi } from "../../baseApi";

const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommentsByPostId: builder.query({
            query: (postId) => ({
                url: `/comments/${postId}`,
                method: 'GET'
            })
        })
    })
})


export const { useGetCommentsByPostIdQuery } = commentApi;