import { apiSlice } from "../../api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    handleStripeCheckout: builder.mutation({
      query: data => ({
        url: '/stripe/checkout-session',
        method: 'POST',
        body: {
          ...data
        }
      }),
    }),
  }),
});

export const {
  useHandleStripeCheckoutMutation,
} = cartApiSlice;