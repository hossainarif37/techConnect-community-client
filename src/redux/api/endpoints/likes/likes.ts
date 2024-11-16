import { baseApi } from "../../baseApi";

const postsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        likePost: builder.mutation({
            query: ({postId}) => ({
                url: `/likes/${postId}`,
                method: 'POST'
            }),
        }),
    })
})


export const {useLikePostMutation } = postsApi;