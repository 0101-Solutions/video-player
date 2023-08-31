import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
                const loadedUsers = responseData.data.map((user) => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" },
                { type: 'Class', id: 'LIST' },
                { type: 'Dorm', id: 'LIST' }
            ]
        }),
        updateUser: builder.mutation({
            query: ({ id, body }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: {
                    ...body
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id },
                { type: 'Class', id: 'LIST' },
                { type: 'Dorm', id: 'LIST' }
            ]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id },
                { type: 'Class', id: 'LIST' },
                { type: 'Dorm', id: 'LIST' }
            ]
        }),
    }),
});

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApiSlice;

// Selectors

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Creates memoized selector
export const selectUsers = createSelector(
    selectUsersResult,
    (usersResult) => usersResult.data // Normalized state object with ids and entities.
);

// getSelectors creates these selectors and we rename them with aliases using the object destructuring syntax.

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,

    //Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsers(state) ?? initialState);