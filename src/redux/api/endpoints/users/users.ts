import { baseApi } from "../../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            }),
        }),

        register: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body
            })
        }),

        currentUser: builder.query({
            query: () => ({
                url: '/users/current-user',
                method: 'GET',
            }),
        }),

        getAllUsers: builder.query({
            query: (name) => ({
                url: `/users?name=${name}`,
                method: 'GET',
            }),
        }),

        getUserProfileById: builder.query({
            query: (id) => ({
                url: `/users/profile/${id}`,
                method: 'GET',
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        }),

        updateUser: builder.mutation({
            query: ({userId, body}) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body
            })
        }),


    })
})


export const { useLoginMutation, useRegisterMutation, useCurrentUserQuery, useLazyCurrentUserQuery, useGetAllUsersQuery, useGetUserProfileByIdQuery, useUpdateUserMutation } = userApi;