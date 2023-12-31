import { apiSlice } from "../../api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials }
      }),
    }),
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials }
      }),
    }),
    myProfile: builder.query({
      query: () => ({ url: '/auth/me', method: 'GET' }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (response) => {
        return response
      },
      invalidatesTags: ['User']
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(logOut())

          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000);

        } catch (err) {
          console.log(err)
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data
          dispatch(setCredentials({ accessToken }))
        } catch (err) {
          console.log(err)
        }
      }
    }),
    forgotPassword: builder.mutation({
      query: email => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email }
      }),
    }),
    setNewPassword: builder.mutation({
      query: ({ data, token }) => ({
        url: `/auth/update-password/${token}`,
        method: 'POST',
        body: { ...data }
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ token }) => ({
        url: `/auth/verify-email/${token}`,
        method: 'GET',
      }),
    }),
  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useMyProfileQuery,
  useSendLogoutMutation,
  useRefreshMutation,
  useForgotPasswordMutation,
  useSetNewPasswordMutation,
  useVerifyEmailMutation
} = authApiSlice;

// Selectors
export const selectUser = authApiSlice.endpoints.myProfile.select();