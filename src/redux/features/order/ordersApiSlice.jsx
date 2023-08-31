import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState();

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/orders",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedOrders = responseData.data.map((order) => {
          order.id = order._id;
          return order;
        });
        return ordersAdapter.setAll(initialState, loadedOrders);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: 'Order', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Order', id }))
          ]
        } else return [{ type: 'Order', id: 'LIST' }]
      }
    }),
    addNewOrder: builder.mutation({
      query: initialOrderData => ({
        url: '/orders',
        method: 'POST',
        body: {
          ...initialOrderData,
        }
      }),
      invalidatesTags: [
        { type: 'Order', id: "LIST" },
        { type: 'Class', id: 'LIST' },
        { type: 'Dorm', id: 'LIST' }
      ]
    }),
    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: {
          ...body
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Order', id: arg.id },
        { type: 'Class', id: 'LIST' },
        { type: 'Dorm', id: 'LIST' }
      ]
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Order', id: arg.id },
        { type: 'Class', id: 'LIST' },
        { type: 'Dorm', id: 'LIST' }
      ]
    }),
    getMyOrders: builder.query({
      query: () => "/orders/my-orders",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: 'MyOrder', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'MyOrder', id }))
          ]
        } else return [{ type: 'MyOrder', id: 'LIST' }]
      }
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useAddNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApiSlice;

// Selectors

export const selectOrdersResult = ordersApiSlice.endpoints.getOrders.select();

// Creates memoized selector
export const selectOrders = createSelector(
  selectOrdersResult,
  (ordersResult) => ordersResult.data // Normalized state object with ids and entities.
);

// getSelectors creates these selectors and we rename them with aliases using the object destructuring syntax.

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,

  //Pass in a selector that returns the orders slice of state
} = ordersAdapter.getSelectors(state => selectOrders(state) ?? initialState);