

import { baseApi } from "../../baseApi";

const postsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        posts: builder.query({
            query: () => ({
                url: '/posts',
                method: 'GET',
            }),
        })
    })
})


export const { usePostsQuery } = postsApi;